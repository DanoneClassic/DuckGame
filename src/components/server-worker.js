const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/assets/css/common/footer.css',
    '/src/assets/css/common/header.css',
    '/src/assets/css/common/menu.css',
    '/src/assets/css/common/stats.css',
    '/src/assets/css/entity/Dino.css',
    '/src/assets/css/entity/Obstacle.css',
    '/src/assets/css/App.css',
    '/src/assets/css/Game.css',
    '/src/assets/images/Duck.png',
    '/src/assets/images/Ground.png',
    '/src/assets/images/Mushroom.png',
    '/src/assets/images/Mushroom2.png',
    '/src/assets/images/Pen.png',
    '/src/assets/images/Sky.png',
    '/src/assets/images/Spikes.png',
    '/src/assets/jump.mp3',
    '/src/components/BackgroundCanvas.js',
    '/src/components/Dino.js',
    '/src/components/Game.js',
    '/src/components/Menu.js',
    '/src/components/Obstacle.js',
    '/src/components/server-worker.js',
    '/src/components/Stats.js',
    '/src/App.js',
    '/src/index.js',
];

class ServiceWorker {
    constructor() {
        // eslint-disable-next-line no-restricted-globals
        self.addEventListener('install', this.onInstall.bind(this));
        // eslint-disable-next-line no-restricted-globals
        self.addEventListener('activate', this.onActivate.bind(this));
        // eslint-disable-next-line no-restricted-globals
        self.addEventListener('fetch', this.onFetch.bind(this));
    }

    async onInstall(event) {
        console.log('[ServiceWorker] Install');
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('[ServiceWorker] Caching app shell');
                    return cache.addAll(urlsToCache);
                })
        );
    }

    onActivate(event) {
        console.log('[ServiceWorker] Activate');
        const cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    }

    async onFetch(event) {
        console.log('[ServiceWorker] Fetch', event.request.url);
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
                })
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
    }
}

new ServiceWorker();