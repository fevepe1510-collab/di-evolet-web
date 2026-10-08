import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = process.cwd();
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4','.ico':'image/x-icon'};
const port=Number(process.env.PORT||3000);
createServer(async(req,res)=>{
  let p;try{p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const file=resolve(root,'.'+(p==='/'?'/index.html':p));
  if(!file.startsWith(root+sep) && file!==resolve(root,'index.html')){res.writeHead(403);res.end();return;}
  try{const s=await stat(file);if(!s.isFile())throw new Error('notfile');
    res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');
    res.setHeader('Cache-Control',file.endsWith('index.html')?'no-cache':'public, max-age=3600');
    res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log('Di Evolet web on http://localhost:'+port));
