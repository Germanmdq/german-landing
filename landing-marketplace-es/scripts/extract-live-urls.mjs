import fs from 'node:fs/promises';
const items=JSON.parse(await fs.readFile('src/templates.json','utf8'));
const out=[]; let done=0;
async function one(item){
  try{
    const html=await (await fetch(item.referencia,{headers:{'user-agent':'Mozilla/5.0'}})).text();
    const urls=[...html.matchAll(/https:\/\/[A-Za-z0-9.-]+\.lovable\.app\/?/g)].map(m=>m[0]);
    const live=[...new Set(urls)][0]||'';
    return {...item,live};
  }catch(e){return {...item,live:'',error:String(e)}}
}
const batch=8;
for(let i=0;i<items.length;i+=batch){
 const part=await Promise.all(items.slice(i,i+batch).map(one)); out.push(...part); done+=part.length; console.log(`${done}/${items.length}`);
}
await fs.writeFile('src/templates-live.json',JSON.stringify(out,null,2));
console.log('LIVE',out.filter(x=>x.live).length,'MISSING',out.filter(x=>!x.live).length);
console.log(out.filter(x=>!x.live).map(x=>[x.id,x.slug]));
