// Multilingual Support for Hajj App
const translations = {
    sq: { // Albanian
        app_title: "Haxhi dhe Rregullat e Tij",
        navigation: {
            pillars: "Shtyllat",
            umrah: "Umra",
            hajj: "Haxhi",
            ihram: "Ihram",
            miqat: "Miqatet",
            medina: "Medina",
            map: "Harta",
            features: "Veçoritë"
        },
        sections: {
            pillars_title: "🏛️ Shtyllat e Islamit",
            umrah_title: "🕌 Kryerja e Umres",
            hajj_title: "🏔️ Etapat Kryesore të Haxhit",
            ihram_title: "👕 Veshja dhe Ndalesat në Ihram",
            miqat_title: "🚪 Edukata e Udhëtimit dhe Miqatet",
            obligations_title: "📋 Kushtet dhe Detyrimet e Haxhit",
            medina_title: "🕌 Lutjet dhe Vizitat në Medinë",
            rules_title: "📖 Rregulla të Tjera të Haxhit"
        },
        features: {
            map_title: "🗺️ Harta Interaktive e Haxhit",
            features_title: "📱 Veçoritë e Aplikacionit",
            prayer_times: "🕐 Kohët e Namazit",
            prayer_times_desc: "Shiko kohët e namazit bazuar në vendndodhjen tuaj",
            qibla_finder: "🧭 Gjetësi i Kiblës",
            qibla_finder_desc: "Gjeni drejtimin e saktë të Kiblës",
            checklist: "✅ Lista e Kontrollit",
            checklist_desc: "Ndiqni progresin tuaj gjatë Haxhit",
            language: "🌐 Ndërrimi i Gjuhës",
            language_desc: "Shqip / English"
        },
        prayers: {
            fajr: "Sabahu",
            sunrise: "Lindja e Diellit",
            dhuhr: "Dreka",
            asr: "Ikindija",
            maghrib: "Akshami",
            isha: "Jacia",
            next_prayer: "Namazi i Ardhshëm",
            remaining: "Mbeten",
            location_unavailable: "Duke përdorur kohët e Mekës (vendndodhja nuk është e disponueshme)",
            location_error: "Nuk mund të merret vendndodhja. Ju lutemi aktivizoni GPS-in.",
            geolocation_unsupported: "Geovendndodhja nuk është e mbështetur nga shfletuesi juaj."
        },
        qibla: {
            title: "🧭 Gjetësi i Kiblës",
            direction: "Kibla është",
            from_north: "nga veriu",
            distance_to_mecca: "Distanca deri në Mekë",
            calculating: "Duke përcaktuar drejtimin..."
        },
        checklist: {
            title: "✅ Lista e Kontrollit të Haxhit",
            progress: "Progresi i Përgjithshëm",
            completed: "të përfunduara",
            categories: {
                preparation: "Përgatitja",
                travel: "Udhëtimi",
                hajj_rituals: "Ritualet e Haxhit",
                medina_visits: "Vizitat në Medinë"
            }
        },
        map_tabs: {
            mecca: "Meka",
            miqat: "Miqatet",
            medina: "Medina"
        },
        close: "Mbyll"
    },
    en: { // English
        app_title: "Hajj and Its Rules",
        navigation: {
            pillars: "Pillars",
            umrah: "Umrah",
            hajj: "Hajj",
            ihram: "Ihram",
            miqat: "Miqat",
            medina: "Medina",
            map: "Map",
            features: "Features"
        },
        sections: {
            pillars_title: "🏛️ Pillars of Islam",
            umrah_title: "🕌 Performing Umrah",
            hajj_title: "🏔️ Main Stages of Hajj",
            ihram_title: "👕 Ihram Clothing and Prohibitions",
            miqat_title: "🚪 Travel Etiquette and Miqat Points",
            obligations_title: "📋 Conditions and Obligations of Hajj",
            medina_title: "🕌 Prayers and Visits in Medina",
            rules_title: "📖 Other Rules of Hajj"
        },
        features: {
            map_title: "🗺️ Interactive Hajj Map",
            features_title: "📱 App Features",
            prayer_times: "🕐 Prayer Times",
            prayer_times_desc: "View prayer times based on your location",
            qibla_finder: "🧭 Qibla Finder",
            qibla_finder_desc: "Find the accurate direction of Qibla",
            checklist: "✅ Checklist",
            checklist_desc: "Track your progress during Hajj",
            language: "🌐 Language Switch",
            language_desc: "Albanian / English"
        },
        prayers: {
            fajr: "Fajr",
            sunrise: "Sunrise",
            dhuhr: "Dhuhr",
            asr: "Asr",
            maghrib: "Maghrib",
            isha: "Isha",
            next_prayer: "Next Prayer",
            remaining: "Remaining",
            location_unavailable: "Using Mecca times (location unavailable)",
            location_error: "Cannot get location. Please enable GPS.",
            geolocation_unsupported: "Geolocation is not supported by your browser."
        },
        qibla: {
            title: "🧭 Qibla Finder",
            direction: "Qibla is",
            from_north: "from north",
            distance_to_mecca: "Distance to Mecca",
            calculating: "Determining direction..."
        },
        checklist: {
            title: "✅ Hajj Checklist",
            progress: "Overall Progress",
            completed: "completed",
            categories: {
                preparation: "Preparation",
                travel: "Travel",
                hajj_rituals: "Hajj Rituals",
                medina_visits: "Medina Visits"
            }
        },
        map_tabs: {
            mecca: "Mecca",
            miqat: "Miqat",
            medina: "Medina"
        },
        close: "Close"
    }
};

// Translation manager
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('app_language') || 'sq';
        this.translations = translations;
    }
    
    // Get translation for a key
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to Albanian if key not found
                value = this.translations['sq'];
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey]) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }
        
        return value || key;
    }
    
    // Set language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('app_language', lang);
            this.updateUI();
        }
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Update UI with current language
    updateUI() {
        // Update title
        document.title = this.t('app_title');
        document.querySelector('h1').textContent = `🕋 ${this.t('app_title')}`;
        
        // Update navigation
        const navItems = document.querySelectorAll('.nav-item');
        const navKeys = ['pillars', 'umrah', 'hajj', 'ihram', 'miqat', 'medina', 'map', 'features'];
        navItems.forEach((item, index) => {
            if (navKeys[index]) {
                item.textContent = this.t(`navigation.${navKeys[index]}`);
            }
        });
        
        // Update section titles
        const sectionTitles = {
            'shtyllat': 'sections.pillars_title',
            'umra': 'sections.umrah_title',
            'haxhi': 'sections.hajj_title',
            'ihram': 'sections.ihram_title',
            'miqatet': 'sections.miqat_title',
            'medina': 'sections.medina_title'
        };
        
        for (const [id, key] of Object.entries(sectionTitles)) {
            const element = document.querySelector(`#${id} h2`);
            if (element) {
                element.textContent = this.t(key);
            }
        }
        
        // Update feature cards
        this.updateFeatureCards();
        
        // Update map tabs
        this.updateMapTabs();
        
        // Update modal titles
        this.updateModalTitles();
    }
    
    updateFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        const featureKeys = [
            { title: 'features.prayer_times', desc: 'features.prayer_times_desc' },
            { title: 'features.qibla_finder', desc: 'features.qibla_finder_desc' },
            { title: 'features.checklist', desc: 'features.checklist_desc' },
            { title: 'features.language', desc: 'features.language_desc' }
        ];
        
        featureCards.forEach((card, index) => {
            if (featureKeys[index]) {
                const title = card.querySelector('h3');
                const desc = card.querySelector('p');
                if (title) title.textContent = this.t(featureKeys[index].title);
                if (desc) desc.textContent = this.t(featureKeys[index].desc);
            }
        });
    }
    
    updateMapTabs() {
        const mapTabs = document.querySelectorAll('.map-tab');
        const tabKeys = ['map_tabs.mecca', 'map_tabs.miqat', 'map_tabs.medina'];
        
        mapTabs.forEach((tab, index) => {
            if (tabKeys[index]) {
                tab.textContent = this.t(tabKeys[index]);
            }
        });
    }
    
    updateModalTitles() {
        // Prayer times modal
        const prayerModalTitle = document.querySelector('#prayerModal h2');
        if (prayerModalTitle) {
            prayerModalTitle.textContent = this.t('features.prayer_times');
        }
        
        // Qibla modal
        const qiblaModalTitle = document.querySelector('#qiblaModal h2');
        if (qiblaModalTitle) {
            qiblaModalTitle.textContent = this.t('qibla.title');
        }
        
        // Checklist modal
        const checklistModalTitle = document.querySelector('#checklistModal h2');
        if (checklistModalTitle) {
            checklistModalTitle.textContent = this.t('checklist.title');
        }
    }
    
    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}

// Initialize translation manager
const translationManager = new TranslationManager();

// Enhanced toggle language function
function toggleLanguage() {
    const currentLang = translationManager.getCurrentLanguage();
    const newLang = currentLang === 'sq' ? 'en' : 'sq';
    translationManager.setLanguage(newLang);
    
    // Update prayer times if modal is open
    if (document.getElementById('prayerModal').style.display === 'block') {
        showPrayerTimes();
    }
    
    // Update checklist if modal is open
    if (document.getElementById('checklistModal').style.display === 'block') {
        initializeChecklist();
    }
}

// Initialize UI with saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    translationManager.updateUI();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationManager, translations };
} else {
    window.TranslationManager = TranslationManager;
    window.translationManager = translationManager;
}

