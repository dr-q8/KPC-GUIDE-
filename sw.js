const CACHE='kpc-ce-2026-09-r87';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon-32.png','./print/KPC-Tracheostomy-Ward-Cards-A5.pdf','./print/KPC-Tracheostomy-Bedhead-Signs-A4.pdf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
const put=(req,res)=>{if(res.ok&&new URL(req.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return res;};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(new URL(r.url).origin!==location.origin)return;
 const page=r.mode==='navigate'||/\/$|\.html$/.test(new URL(r.url).pathname);
 if(page){e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>put(r,res)).catch(()=>caches.match(r,{ignoreSearch:true}).then(c=>c||caches.match('./index.html'))));return;}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(res=>put(r,res))).catch(()=>caches.match('./index.html')));});
