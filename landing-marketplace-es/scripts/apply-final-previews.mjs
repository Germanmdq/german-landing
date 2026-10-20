import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const catalogPath=path.join(root,'src','catalog.json');
const outDir=path.join(root,'public','previews-es-final');
const catalog=JSON.parse(await fs.readFile(catalogPath,'utf8'));
let changed=0;
for(const item of catalog){
  if(item.fuente!=='Landings') continue;
  const prefix=String(item.id).padStart(3,'0')+'-';
  const files=(await fs.readdir(outDir)).filter(f=>f.startsWith(prefix)&&f.endsWith('.png'));
  if(files[0]){item.imagen=`/previews-es-final/${files[0]}`; changed++;}
}
await fs.writeFile(catalogPath,JSON.stringify(catalog,null,2));
console.log(`Actualizadas ${changed} previews finales`);
