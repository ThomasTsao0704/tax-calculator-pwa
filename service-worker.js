const CACHE_NAME = 'calculator-app-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/luxury.html',
    '/settings.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/logo-192.png',
    '/logo-512.png'
];

// 安裝階段：快取所有必要檔案
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting(); // 立即啟用新 Service Worker
});

// 啟用階段：刪除舊快取
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        )
    );
    self.clients.claim();
});

// 抓取請求：離線時讀快取，否則抓最新檔案並更新快取
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => cached || Response.error());

            return cached || fetchPromise;
        })
    );
});
