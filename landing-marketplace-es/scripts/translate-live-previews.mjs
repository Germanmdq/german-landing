import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root=process.cwd();
const items=JSON.parse(await fs.readFile('src/templates-live.json','utf8'));
const outDir=path.join(root,'public','previews-es-final');
await fs.mkdir(outDir,{recursive:true});
const cachePath=process.env.CACHE_PATH ? path.resolve(process.env.CACHE_PATH) : path.join(root,'translation-cache.json');
const statusPath=process.env.STATUS_PATH ? path.resolve(process.env.STATUS_PATH) : path.join(root,'preview-status.json');
let cache={}; try{cache=JSON.parse(await fs.readFile(cachePath,'utf8'))}catch{}
const wanted=process.argv.slice(2).map(Number).filter(Boolean);
const list=wanted.length?items.filter(x=>wanted.includes(x.id)):items;

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function translateBatch(texts){
  const result=new Map();
  const pending=[];
  for(const t of texts){
    if(cache[t]) result.set(t,cache[t]); else pending.push(t);
  }
  let start=0;
  while(start<pending.length){
    let end=start, size=0;
    while(end<pending.length && size+pending[end].length<2800 && end-start<35){size+=pending[end].length+16; end++;}
    if(end===start) end++;
    const chunk=pending.slice(start,end);
    const payload=chunk.map((t,i)=>`<<<${i}>>> ${t}`).join('\n');
    const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='+encodeURIComponent(payload);
    let translated='';
    for(let attempt=0;attempt<5;attempt++){
      try{
        const res=await fetch(url,{headers:{'user-agent':'Mozilla/5.0'}});
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data=await res.json(); translated=(data?.[0]||[]).map(x=>x?.[0]||'').join(''); break;
      }catch(e){if(attempt===4) throw e; await sleep(500*(attempt+1));}
    }
    const matches=[...translated.matchAll(/<<<(\d+)>>>\s*([\s\S]*?)(?=(?:<<<\d+>>>)|$)/g)];
    if(matches.length!==chunk.length){
      // fallback one-by-one for this chunk
      for(const t of chunk){
        const u='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='+encodeURIComponent(t);
        const d=await (await fetch(u,{headers:{'user-agent':'Mozilla/5.0'}})).json();
        const tr=(d?.[0]||[]).map(x=>x?.[0]||'').join('').trim()||t; result.set(t,tr); cache[t]=tr; await sleep(40);
      }
    } else {
      for(const m of matches){const i=Number(m[1]); const tr=m[2].trim(); const orig=chunk[i]; if(orig){result.set(orig,tr||orig); cache[orig]=tr||orig;}}
    }
    start=end; await sleep(70);
  }
  return result;
}

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
await page.emulateMedia({reducedMotion:'reduce'});
const status=[];
for(let idx=0;idx<list.length;idx++){
  const item=list[idx]; const filename=`${String(item.id).padStart(3,'0')}-${item.slug}.png`;
  try{
    console.log(`[${idx+1}/${list.length}] ${item.id} ${item.slug} -> ${item.live}`);
    await page.goto(item.live,{waitUntil:'domcontentloaded',timeout:30000});
    try{await page.waitForLoadState('networkidle',{timeout:7000})}catch{}
    await page.waitForTimeout(1200);
    // Trigger lazy-loaded sections/images before extracting/translating text.
    await page.evaluate(async()=>{
      document.documentElement.style.scrollBehavior='auto';
      document.body.style.scrollBehavior='auto';
      const max=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
      for(let y=0;y<max;y+=700){
        window.scrollTo(0,y);
        await new Promise(r=>setTimeout(r,45));
      }
      window.scrollTo(0,0);
      await new Promise(r=>setTimeout(r,180));
      document.querySelector('#lovable-badge')?.remove();
    });
    const payload=await page.evaluate(()=>{
      const skip=new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE']); const texts=[]; const attrs=[];
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let n;
      while(n=walker.nextNode()){
        const p=n.parentElement; if(!p||skip.has(p.tagName)) continue;
        const raw=n.nodeValue||''; const t=raw.trim();
        if(t.length<2||!/\p{L}/u.test(t)) continue;
        const cs=getComputedStyle(p); if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity)===0) continue;
        texts.push(t);
      }
      for(const el of document.querySelectorAll('[placeholder],[aria-label],[title],input[type="submit"][value],input[type="button"][value]')){
        for(const a of ['placeholder','aria-label','title','value']){
          if(!el.hasAttribute(a)) continue; const v=(el.getAttribute(a)||'').trim(); if(v.length>1&&/\p{L}/u.test(v)) attrs.push(v);
        }
      }
      return {texts:[...new Set(texts)],attrs:[...new Set(attrs)]};
    });
    const all=[...new Set([...payload.texts,...payload.attrs])];
    const map=await translateBatch(all);
    const obj=Object.fromEntries(map.entries());
    await page.evaluate((obj)=>{
      const skip=new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE']);
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let n;
      while(n=walker.nextNode()){
        const p=n.parentElement; if(!p||skip.has(p.tagName)) continue;
        const raw=n.nodeValue||''; const t=raw.trim(); if(!obj[t]) continue;
        const lead=raw.match(/^\s*/)?.[0]||'', tail=raw.match(/\s*$/)?.[0]||''; n.nodeValue=lead+obj[t]+tail;
      }
      for(const el of document.querySelectorAll('[placeholder],[aria-label],[title],input[type="submit"][value],input[type="button"][value]')){
        for(const a of ['placeholder','aria-label','title','value']){const v=(el.getAttribute(a)||'').trim(); if(obj[v]) el.setAttribute(a,obj[v]);}
      }
      document.documentElement.lang='es'; window.scrollTo(0,0);
    },obj);
    await page.waitForTimeout(250);
    await page.screenshot({path:path.join(outDir,filename),fullPage:true,animations:'disabled'});
    status.push({id:item.id,slug:item.slug,ok:true,texts:all.length,file:filename});
  }catch(e){console.error('ERROR',item.id,e.message);status.push({id:item.id,slug:item.slug,ok:false,error:String(e.message||e)});}
  if((idx+1)%5===0 || idx===list.length-1){await fs.writeFile(cachePath,JSON.stringify(cache,null,2)); await fs.writeFile(statusPath,JSON.stringify(status,null,2));}
}
await browser.close();
await fs.writeFile(cachePath,JSON.stringify(cache,null,2));
await fs.writeFile(statusPath,JSON.stringify(status,null,2));
console.log(`DONE ok=${status.filter(x=>x.ok).length} fail=${status.filter(x=>!x.ok).length}`);
