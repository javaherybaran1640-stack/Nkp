// service-worker.js
const CACHE = 'nkp-cache-v1';
const ASSETS = [
  '/', '/index.html','/css/styles.css','/css/themes.css',
  '/js/utils.js','/js/date-utils.js','/js/ui.js','/js/auth.js','/js/app.js',
  '/js/products.js','/js/customers.js','/js/accounting.js','/js/inventory.js','/js/reports.js','/js/backup.js',
  '/manifest.json','/assets/icons/icon-192.png','/assets/icons/icon-512.png'
];
self.addEventListener('install', e=> e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate', e=> e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
