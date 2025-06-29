// Hajj Guide Application
let currentLanguage = localStorage.getItem('hajj_app_language') || 'sq';
let currentView = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLanguage);
    
    // Set up event listeners
    setupEventListeners();
    
    // Show home view by default
    showView('home');
    
    // Initialize components
    initializeComponents();
});

// Set up all event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('[data-target]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetView = this.getAttribute('data-target');
            if (targetView === 'map') {
                window.location.href = 'map.html';
            } else {
                showView(targetView);
            }
        });
    });
    
    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
}

// Initialize components
function initializeComponents() {
    // Initialize any components that need setup
    updateActiveButton();
}

// Show a specific view
function showView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = 'none';
    });
    
    // Show the selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.style.display = 'block';
        currentView = viewId;
    }
    
    // Update active button
    updateActiveButton();
    
    // Initialize view-specific components
    if (viewId === 'prayer-times') {
        updatePrayerTimes();
    }
}

// Update active navigation button
function updateActiveButton() {
    document.querySelectorAll('.nav-button').forEach(button => {
        const target = button.getAttribute('data-target');
        if (target === currentView || 
            (currentView === 'home' && target === 'dashboard')) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Toggle between languages
function toggleLanguage() {
    currentLanguage = currentLanguage === 'sq' ? 'en' : 'sq';
    setLanguage(currentLanguage);
    localStorage.setItem('hajj_app_language', currentLanguage);
    
    // Update UI elements
    updateUI();
}

// Set language for the application
function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update direction for RTL languages if needed
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Update UI elements
function updateUI() {
    // Update any dynamic UI elements here
    updatePrayerTimes();
    updateActiveButton();
}

// Update prayer times display
function updatePrayerTimes() {
    // This would be implemented to fetch and display prayer times
    // For now, we'll just update the display text
    const prayerTimesElement = document.getElementById('prayer-times-display');
    if (prayerTimesElement) {
        prayerTimesElement.textContent = translations[currentLanguage].loading_prayer_times || 'Loading prayer times...';
    }
}

// Set language for the application
function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Initialize navigation between views
function initializeNavigation() {
    // Get all menu buttons (excluding the map link)
    const menuButtons = document.querySelectorAll('.menu-button:not([href])');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-target');
            showView(targetView);
        });
    });
}

// Show a specific view with smooth transition
function showView(viewId) {
    // Update active state of buttons
    document.querySelectorAll('.menu-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Update active state of the clicked button
    const activeButton = document.querySelector(`.menu-button[data-target="${viewId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Hide all content cards
    document.querySelectorAll('.content-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Show the selected card with fade effect
    const targetCard = document.getElementById(viewId);
    if (targetCard) {
        setTimeout(() => {
            targetCard.classList.add('active');
        }, 10);
    }
    
    currentView = viewId;
}

// Map functionality
function initializeMap() {
    // Initialize map centered on Mecca
    map = L.map('map').setView([21.4225, 39.8262], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Show Mecca by default
    showMap('mecca');
}

function showMap(type) {
    // Clear existing markers
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // Update tab appearance
    document.querySelectorAll('.map-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    switch(type) {
        case 'mecca':
            showMeccaMap();
            break;
        case 'miqat':
            showMiqatMap();
            break;
        case 'medina':
            showMedinaMap();
            break;
    }
}

function showMeccaMap() {
    map.setView([21.4225, 39.8262], 13);
    
    // Mecca landmarks
    const meccaLandmarks = [
        { lat: 21.4225, lng: 39.8262, name: 'Qabja (Haram Sharif)', desc: 'Vendi më i shenjtë në Islam' },
        { lat: 21.4205, lng: 39.8368, name: 'Safa', desc: 'Fillimi i Sajit' },
        { lat: 21.4244, lng: 39.8275, name: 'Merva', desc: 'Përfundimi i Sajit' },
        { lat: 21.3891, lng: 39.8579, name: 'Arafat', desc: 'Shtyllë e Haxhit' },
        { lat: 21.4067, lng: 39.8756, name: 'Muzdelife', desc: 'Qëndrimi natën' },
        { lat: 21.4200, lng: 39.8900, name: 'Mina', desc: 'Gjuajtja e guralecëve' }
    ];
    
    meccaLandmarks.forEach(landmark => {
        L.marker([landmark.lat, landmark.lng])
            .addTo(map)
            .bindPopup(`<b>${landmark.name}</b><br>${landmark.desc}`);
    });
}

function showMiqatMap() {
    map.setView([24.0, 42.0], 5);
    
    // Miqat points
    const miqatPoints = [
        { lat: 24.4539, lng: 39.6034, name: 'Dhul Hulaifa', desc: 'Miqat për banorët e Medinës' },
        { lat: 22.8333, lng: 38.3333, name: 'Juhfa', desc: 'Miqat për ata që vijnë nga Siria' },
        { lat: 23.0000, lng: 40.0000, name: 'Qarn al-Manazil', desc: 'Miqat për ata që vijnë nga Najdi' },
        { lat: 18.0000, lng: 42.0000, name: 'Yalamlam', desc: 'Miqat për ata që vijnë nga Jemeni' },
        { lat: 31.0000, lng: 45.0000, name: 'Dhat Irq', desc: 'Miqat për ata që vijnë nga Iraku' }
    ];
    
    miqatPoints.forEach(miqat => {
        L.marker([miqat.lat, miqat.lng])
            .addTo(map)
            .bindPopup(`<b>${miqat.name}</b><br>${miqat.desc}`);
    });
    
    // Add Mecca for reference
    L.marker([21.4225, 39.8262])
        .addTo(map)
        .bindPopup('<b>Meka</b><br>Destinacioni final');
}

function showMedinaMap() {
    map.setView([24.4539, 39.6034], 13);
    
    // Medina landmarks
    const medinaLandmarks = [
        { lat: 24.4539, lng: 39.6034, name: 'Xhamia e Profetit', desc: 'Masjid an-Nabawi' },
        { lat: 24.4378, lng: 39.6158, name: 'Xhamia Kuba', desc: 'Xhamia e parë e ndërtuar' },
        { lat: 24.4444, lng: 39.6111, name: 'Varrezat Baki', desc: 'Varrezat e Medinës' },
        { lat: 24.4847, lng: 39.5794, name: 'Mali Uhud', desc: 'Vendi i betejës së Uhudit' }
    ];
    
    medinaLandmarks.forEach(landmark => {
        L.marker([landmark.lat, landmark.lng])
            .addTo(map)
            .bindPopup(`<b>${landmark.name}</b><br>${landmark.desc}`);
    });
}

// Prayer Times functionality
function showPrayerTimes() {
    document.getElementById('prayerModal').style.display = 'block';
    
    if (userLocation) {
        calculatePrayerTimes(userLocation.lat, userLocation.lng);
    } else {
        document.getElementById('prayerTimes').innerHTML = 
            '<p>Vendndodhja nuk është e disponueshme. Duke përdorur kohët e Mekës...</p>';
        calculatePrayerTimes(21.4225, 39.8262); // Mecca coordinates
    }
}

function calculatePrayerTimes(lat, lng) {
    // Simplified prayer time calculation (in a real app, use a proper library)
    const now = new Date();
    const prayerTimes = {
        'Sabahu': '05:30',
        'Dreka': '12:15',
        'Ikindija': '15:45',
        'Akshami': '18:20',
        'Jacia': '19:45'
    };
    
    let prayerTimesHtml = '';
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        prayerTimesHtml += `
            <div class="prayer-time">
                <span class="prayer-name">${prayer}</span>
                <span class="prayer-time-value">${time}</span>
            </div>
        `;
    }
    
    document.getElementById('prayerTimes').innerHTML = prayerTimesHtml;
}

function closePrayerTimes() {
    document.getElementById('prayerModal').style.display = 'none';
}

// Qibla Finder functionality
function showQiblaFinder() {
    document.getElementById('qiblaModal').style.display = 'block';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const qiblaDirection = calculateQiblaDirection(userLat, userLng);
            
            document.getElementById('needle').style.transform = 
                `translateX(-50%) rotate(${qiblaDirection}deg)`;
            document.getElementById('qiblaDirection').textContent = 
                `Kibla është ${Math.round(qiblaDirection)}° nga veriu`;
        }, function() {
            document.getElementById('qiblaDirection').textContent = 
                'Nuk mund të merret vendndodhja. Ju lutemi aktivizoni GPS-in.';
        });
    } else {
        document.getElementById('qiblaDirection').textContent = 
            'Geovendndodhja nuk është e mbështetur nga shfletuesi juaj.';
    }
}

function calculateQiblaDirection(userLat, userLng) {
    // Mecca coordinates
    const meccaLat = 21.4225;
    const meccaLng = 39.8262;
    
    // Convert to radians
    const lat1 = userLat * Math.PI / 180;
    const lat2 = meccaLat * Math.PI / 180;
    const deltaLng = (meccaLng - userLng) * Math.PI / 180;
    
    // Calculate bearing
    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    
    return bearing;
}

function closeQiblaFinder() {
    document.getElementById('qiblaModal').style.display = 'none';
}

// Checklist functionality
function initializeChecklist() {
    const checklistItems = [
        'Përgatitja e dokumenteve (pasaportë, vizë)',
        'Rezervimi i biletave të udhëtimit',
        'Vaksinimi i nevojshëm',
        'Mësimi i procedurave të Haxhit',
        'Veshja e ihramit në Miqat',
        'Kryerja e Umres (nëse është Temet\'tu)',
        'Qëndrimi në Arafat (9 Dhul Hixhe)',
        'Qëndrimi në Muzdelife',
        'Gjuajtja e guralecëve në Mina',
        'Therja e kurbanit',
        'Qethja e flokëve',
        'Tavafi i Ifadas',
        'Saji mes Safa-Mervas',
        'Tavafi i Lamtumirës'
    ];
    
    let checklistHtml = '';
    checklistItems.forEach((item, index) => {
        const isCompleted = localStorage.getItem(`checklist_${index}`) === 'true';
        checklistHtml += `
            <div class="checklist-item ${isCompleted ? 'completed' : ''}" onclick="toggleChecklistItem(${index})">
                <input type="checkbox" class="checklist-checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleChecklistItem(${index})">
                <span class="checklist-text">${item}</span>
            </div>
        `;
    });
    
    document.getElementById('hajjChecklist').innerHTML = checklistHtml;
}

function showChecklist() {
    document.getElementById('checklistModal').style.display = 'block';
}

function toggleChecklistItem(index) {
    const item = document.querySelectorAll('.checklist-item')[index];
    const checkbox = item.querySelector('.checklist-checkbox');
    
    const isCompleted = !checkbox.checked;
    checkbox.checked = isCompleted;
    
    if (isCompleted) {
        item.classList.add('completed');
    } else {
        item.classList.remove('completed');
    }
    
    localStorage.setItem(`checklist_${index}`, isCompleted.toString());
}

function closeChecklist() {
    document.getElementById('checklistModal').style.display = 'none';
}

// Language functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'sq' ? 'en' : 'sq';
    
    if (currentLanguage === 'en') {
        translateToEnglish();
    } else {
        translateToAlbanian();
    }
}

function translateToEnglish() {
    // Basic translation functionality
    document.querySelector('h1').textContent = '🕋 Hajj and Its Rules';
    document.querySelector('title').textContent = 'Hajj and Its Rules';
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    const englishNav = ['Pillars', 'Umrah', 'Hajj', 'Ihram', 'Miqat', 'Medina', 'Map', 'Features'];
    navItems.forEach((item, index) => {
        if (englishNav[index]) {
            item.textContent = englishNav[index];
        }
    });
}

function translateToAlbanian() {
    // Restore Albanian text
    document.querySelector('h1').textContent = '🕋 Haxhi dhe Rregullat e Tij';
    document.querySelector('title').textContent = 'Haxhi dhe Rregullat e Tij';
    
    // Restore navigation
    const navItems = document.querySelectorAll('.nav-item');
    const albanianNav = ['Shtyllat', 'Umra', 'Haxhi', 'Ihram', 'Miqatet', 'Medina', 'Harta', 'Veçoritë'];
    navItems.forEach((item, index) => {
        if (albanianNav[index]) {
            item.textContent = albanianNav[index];
        }
    });
}

// Utility functions
function loadUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Offline functionality
window.addEventListener('online', function() {
    console.log('App is online');
});

window.addEventListener('offline', function() {
    console.log('App is offline');
});



// Enhanced Prayer Times functionality using the calculator
function showPrayerTimes() {
    document.getElementById('prayerModal').style.display = 'block';
    
    if (userLocation) {
        const calculator = new PrayerTimesCalculator();
        const times = calculator.getCurrentPrayerTimes(userLocation.lat, userLocation.lng);
        displayPrayerTimes(times);
        
        // Get next prayer
        const nextPrayer = calculator.getNextPrayer(userLocation.lat, userLocation.lng);
        displayNextPrayer(nextPrayer);
    } else {
        // Try to get location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                const calculator = new PrayerTimesCalculator();
                const times = calculator.getCurrentPrayerTimes(userLocation.lat, userLocation.lng);
                displayPrayerTimes(times);
                
                const nextPrayer = calculator.getNextPrayer(userLocation.lat, userLocation.lng);
                displayNextPrayer(nextPrayer);
            }, function() {
                // Use Mecca times as fallback
                const calculator = new PrayerTimesCalculator();
                const times = calculator.getCurrentPrayerTimes(21.4225, 39.8262);
                displayPrayerTimes(times, true);
            });
        } else {
            // Use Mecca times as fallback
            const calculator = new PrayerTimesCalculator();
            const times = calculator.getCurrentPrayerTimes(21.4225, 39.8262);
            displayPrayerTimes(times, true);
        }
    }
}

function displayPrayerTimes(times, isFallback = false) {
    const prayerNames = {
        fajr: 'Sabahu',
        sunrise: 'Lindja e Diellit',
        dhuhr: 'Dreka',
        asr: 'Ikindija',
        maghrib: 'Akshami',
        isha: 'Jacia'
    };
    
    let prayerTimesHtml = '';
    
    if (isFallback) {
        prayerTimesHtml += '<p style="color: orange; font-size: 0.9em; margin-bottom: 15px;">⚠️ Duke përdorur kohët e Mekës (vendndodhja nuk është e disponueshme)</p>';
    }
    
    for (const [prayer, time] of Object.entries(times)) {
        if (prayerNames[prayer] && time) {
            prayerTimesHtml += `
                <div class="prayer-time">
                    <span class="prayer-name">${prayerNames[prayer]}</span>
                    <span class="prayer-time-value">${time}</span>
                </div>
            `;
        }
    }
    
    document.getElementById('prayerTimes').innerHTML = prayerTimesHtml;
}

function displayNextPrayer(nextPrayer) {
    if (nextPrayer) {
        const hours = Math.floor(nextPrayer.remaining / 60);
        const minutes = nextPrayer.remaining % 60;
        
        const nextPrayerHtml = `
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid var(--primary-green);">
                <h4 style="margin: 0 0 10px 0; color: var(--primary-green);">Namazi i Ardhshëm</h4>
                <p style="margin: 0; font-weight: bold;">${nextPrayer.name.charAt(0).toUpperCase() + nextPrayer.name.slice(1)} - ${nextPrayer.time}</p>
                <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Mbeten ${hours}h ${minutes}m</p>
            </div>
        `;
        
        document.getElementById('prayerTimes').innerHTML += nextPrayerHtml;
    }
}

// Enhanced Qibla calculation with more accurate formula
function calculateQiblaDirection(userLat, userLng) {
    // Mecca coordinates (more precise)
    const meccaLat = 21.422487;
    const meccaLng = 39.826206;
    
    // Convert to radians
    const lat1 = userLat * Math.PI / 180;
    const lat2 = meccaLat * Math.PI / 180;
    const deltaLng = (meccaLng - userLng) * Math.PI / 180;
    
    // Calculate bearing using the forward azimuth formula
    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    
    return bearing;
}

// Enhanced Qibla finder with compass support
function showQiblaFinder() {
    document.getElementById('qiblaModal').style.display = 'block';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const qiblaDirection = calculateQiblaDirection(userLat, userLng);
            
            // Calculate distance to Mecca
            const distance = calculateDistance(userLat, userLng, 21.422487, 39.826206);
            
            document.getElementById('needle').style.transform = 
                `translateX(-50%) rotate(${qiblaDirection}deg)`;
            document.getElementById('qiblaDirection').innerHTML = 
                `Kibla është <strong>${Math.round(qiblaDirection)}°</strong> nga veriu<br>
                 Distanca deri në Mekë: <strong>${Math.round(distance)} km</strong>`;
            
            // Try to use device orientation for compass
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', function(event) {
                    const alpha = event.alpha; // Compass heading
                    if (alpha !== null) {
                        const adjustedDirection = qiblaDirection - alpha;
                        document.getElementById('needle').style.transform = 
                            `translateX(-50%) rotate(${adjustedDirection}deg)`;
                    }
                });
            }
            
        }, function() {
            document.getElementById('qiblaDirection').innerHTML = 
                '<span style="color: orange;">⚠️ Nuk mund të merret vendndodhja. Ju lutemi aktivizoni GPS-in.</span>';
        });
    } else {
        document.getElementById('qiblaDirection').innerHTML = 
            '<span style="color: red;">❌ Geovendndodhja nuk është e mbështetur nga shfletuesi juaj.</span>';
    }
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Enhanced checklist with categories
function initializeChecklist() {
    const checklistCategories = {
        'Përgatitja': [
            'Përgatitja e dokumenteve (pasaportë, vizë)',
            'Rezervimi i biletave të udhëtimit',
            'Vaksinimi i nevojshëm',
            'Mësimi i procedurave të Haxhit',
            'Përgatitja e parave të nevojshme',
            'Blerja e rrobave të ihramit'
        ],
        'Udhëtimi': [
            'Arritja në aeroportin e destinacionit',
            'Transferi në hotel ose vendqëndrimi',
            'Regjistrimi në hotel',
            'Orientimi me zonën'
        ],
        'Ritualet e Haxhit': [
            'Veshja e ihramit në Miqat',
            'Kryerja e Umres (nëse është Temet\'tu)',
            'Qëndrimi në Arafat (9 Dhul Hixhe)',
            'Qëndrimi në Muzdelife',
            'Gjuajtja e guralecëve në Mina (10 Dhul Hixhe)',
            'Therja e kurbanit',
            'Qethja e flokëve',
            'Tavafi i Ifadas',
            'Saji mes Safa-Mervas',
            'Gjuajtja e guralecëve (11-12 Dhul Hixhe)',
            'Tavafi i Lamtumirës'
        ],
        'Vizitat në Medinë': [
            'Vizita në Xhaminë e Profetit',
            'Falja e namazit në Raudhah',
            'Vizita në varrin e Profetit',
            'Vizita në Xhaminë Kuba',
            'Vizita në varrezat Baki',
            'Vizita në malin Uhud'
        ]
    };
    
    let checklistHtml = '';
    let itemIndex = 0;
    
    for (const [category, items] of Object.entries(checklistCategories)) {
        checklistHtml += `<h4 style="color: var(--primary-green); margin: 20px 0 10px 0; border-bottom: 2px solid var(--gold-accent); padding-bottom: 5px;">${category}</h4>`;
        
        items.forEach(item => {
            const isCompleted = localStorage.getItem(`checklist_${itemIndex}`) === 'true';
            checklistHtml += `
                <div class="checklist-item ${isCompleted ? 'completed' : ''}" onclick="toggleChecklistItem(${itemIndex})">
                    <input type="checkbox" class="checklist-checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleChecklistItem(${itemIndex})">
                    <span class="checklist-text">${item}</span>
                </div>
            `;
            itemIndex++;
        });
    }
    
    // Add progress indicator
    const totalItems = itemIndex;
    const completedItems = Array.from({length: totalItems}, (_, i) => 
        localStorage.getItem(`checklist_${i}`) === 'true'
    ).filter(Boolean).length;
    
    const progressHtml = `
        <div style="margin-bottom: 20px; padding: 15px; background: var(--light-bg); border-radius: 8px;">
            <h4 style="margin: 0 0 10px 0; color: var(--primary-green);">Progresi i Përgjithshëm</h4>
            <div style="background: #ddd; border-radius: 10px; overflow: hidden; height: 20px;">
                <div style="background: var(--primary-green); height: 100%; width: ${(completedItems/totalItems)*100}%; transition: width 0.3s ease;"></div>
            </div>
            <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">${completedItems} nga ${totalItems} të përfunduara (${Math.round((completedItems/totalItems)*100)}%)</p>
        </div>
    `;
    
    document.getElementById('hajjChecklist').innerHTML = progressHtml + checklistHtml;
}

// Notification system for prayer times
function setupPrayerNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                // Schedule notifications for prayer times
                if (userLocation) {
                    const calculator = new PrayerTimesCalculator();
                    const times = calculator.getCurrentPrayerTimes(userLocation.lat, userLocation.lng);
                    
                    // Schedule notifications (this would typically be done by the service worker)
                    console.log('Prayer time notifications enabled');
                }
            }
        });
    }
}

