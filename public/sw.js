const hostname = self.location.hostname;
const isDevOrPreview = 
  hostname.indexOf('run.app') !== -1 || 
  hostname.indexOf('localhost') !== -1 || 
  hostname.indexOf('127.0.0.1') !== -1 ||
  hostname.indexOf('aistudio') !== -1 ||
  hostname.indexOf('webcontainer') !== -1 ||
  hostname.indexOf('stackblitz') !== -1;

if (!isDevOrPreview) {
  self.options = {
      "domain": "3nbf4.com",
      "zoneId": 11465678
  };
  self.lary = "";
  try {
    importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw');
  } catch (err) {
    console.error('Failed to import Monetag service worker:', err);
  }
}

// Service Worker for Waleed Khan Afridi Digital Platform PWA & WebAPK
const CACHE_NAME = 'wka-digital-v2.5-fast';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/services.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // Cache-first strategy for static assets, images, and fonts
  if (
    url.origin === location.origin ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('supabase.co')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Revalidate in background for updates
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        }).catch(() => caches.match('/index.html'));
      })
    );
  }
});
