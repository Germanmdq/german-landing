import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root=process.cwd();
const sitesDir=path.join(root,'generated-sites');
const outDir=path.join(root,'public','previews-es-final');
await fs.mkdir(outDir,{recursive:true});
const dirs=(await fs.readdir(sitesDir,{withFileTypes:true}))
  .filter(d=>d.isDirectory() && /^\d{3}-/.test(d.name))
  .map(d=>d.name).sort();
console.log(`Encontrados ${dirs.length} sitios generados`);
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1200},deviceScaleFactor:1});
await page.emulateMedia({reducedMotion:'reduce'});
let ok=0, bad=[];
for(const [idx,dir] of dirs.entries()){
  const file=path.join(sitesDir,dir,'index.html');
  try{
    await fs.access(file);
    await page.goto(`file://${file}`,{waitUntil:'load',timeout:20000});
    await page.evaluate(async()=>{ if(document.fonts?.ready) await document.fonts.ready; window.scrollTo(0,0); });
    await page.waitForTimeout(150);
    await page.screenshot({path:path.join(outDir,`${dir}.png`),fullPage:true});
    ok++;
  }catch(e){bad.push([dir,String(e.message||e)]);}
  if((idx+1)%20===0 || idx===dirs.length-1) console.log(`${idx+1}/${dirs.length} capturadas`);
}
await browser.close();
console.log(`OK ${ok}; errores ${bad.length}`);
if(bad.length) console.log(JSON.stringify(bad,null,2));
