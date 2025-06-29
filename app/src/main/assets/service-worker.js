// Hajj App Service Worker
const CACHE_NAME = 'hajj-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/images/pillars_of_islam.png',
  '/images/img2.png',
  '/images/img3.png',
  '/images/img4.png',
  '/images/img5.png',
  '/images/img12.png',
  '/images/ihram.png',
  '/images/prohibitions.png',
  '/images/travel_etiquette.png',
  '/images/miqats.jpg',
  '/images/hajj_obligation.png',
  '/images/hajj_kaaba_1.jpg',
  '/images/ic_launcher.png',
  '/images/img1.png',
  '/images/img6.png',
  '/images/img7.png',
  '/images/img8.png',
  '/images/img9.png',
  '/images/img10.png',
  '/images/img11.png',
  '/images/img13.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(function(response) {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(function() {
          // Return offline page or cached content
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for prayer times
self.addEventListener('sync', function(event) {
  if (event.tag === 'prayer-times-sync') {
    event.waitUntil(updatePrayerTimes());
  }
});

// Push notifications for prayer times
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Koha e namazit ka ardhur',
    icon: '/images/ic_launcher.png',
    badge: '/images/ic_launcher.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Shiko aplikacionin',
        icon: '/images/ic_launcher.png'
      },
      {
        action: 'close',
        title: 'Mbyll',
        icon: '/images/ic_launcher.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Hajj App', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Update prayer times function
function updatePrayerTimes() {
  return new Promise(function(resolve) {
    // In a real app, this would fetch from an API
    const prayerTimes = {
      fajr: '05:30',
      dhuhr: '12:15',
      asr: '15:45',
      maghrib: '18:20',
      isha: '19:45'
    };
    
    // Store in IndexedDB or localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
      localStorage.setItem('prayerTimesUpdated', Date.now().toString());
    }
    
    resolve();
  });
}

// Cache map tiles for offline use
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'CACHE_MAP_TILES') {
    event.waitUntil(cacheMapTiles(event.data.tiles));
  }
});

function cacheMapTiles(tiles) {
  return caches.open('map-tiles-cache').then(function(cache) {
    return cache.addAll(tiles);
  });
}

