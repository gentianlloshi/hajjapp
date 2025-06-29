// Theme and Customization Manager
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('app_theme') || 'default';
        this.fontSize = localStorage.getItem('app_font_size') || 'medium';
        this.fontFamily = localStorage.getItem('app_font_family') || 'default';
        
        this.themes = {
            default: {
                name: 'Jeshile/Artë',
                primary: '#005f3c',
                secondary: '#c0aa57',
                background: '#f0f4f2',
                surface: '#ffffff',
                text: '#1a1a1a'
            },
            dark: {
                name: 'E Errët',
                primary: '#4a9d6f',
                secondary: '#d4b86a',
                background: '#121212',
                surface: '#1e1e1e',
                text: '#ffffff'
            },
            light: {
                name: 'E Çelët',
                primary: '#2e7d4a',
                secondary: '#b8a050',
                background: '#fafafa',
                surface: '#ffffff',
                text: '#333333'
            },
            blue: {
                name: 'Blu/Artë',
                primary: '#1565c0',
                secondary: '#ffa000',
                background: '#f3f7ff',
                surface: '#ffffff',
                text: '#1a1a1a'
            }
        };
        
        this.fontSizes = {
            small: { name: 'E Vogël', scale: 0.9 },
            medium: { name: 'Mesatare', scale: 1.0 },
            large: { name: 'E Madhe', scale: 1.2 },
            xlarge: { name: 'Shumë e Madhe', scale: 1.4 }
        };
        
        this.fontFamilies = {
            default: { name: 'Parazgjedhur', family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
            serif: { name: 'Serif', family: "'Times New Roman', Times, serif" },
            mono: { name: 'Monospace', family: "'Courier New', Courier, monospace" },
            arabic: { name: 'Arabike', family: "'Amiri', 'Traditional Arabic', serif" }
        };
        
        this.applyTheme();
        this.applyFontSize();
        this.applyFontFamily();
    }
    
    // Apply theme
    applyTheme() {
        const theme = this.themes[this.currentTheme];
        if (!theme) return;
        
        const root = document.documentElement;
        root.style.setProperty('--primary-green', theme.primary);
        root.style.setProperty('--gold-accent', theme.secondary);
        root.style.setProperty('--light-bg', theme.background);
        root.style.setProperty('--white', theme.surface);
        root.style.setProperty('--dark-text', theme.text);
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', theme.primary);
        }
    }
    
    // Apply font size
    applyFontSize() {
        const fontSize = this.fontSizes[this.fontSize];
        if (!fontSize) return;
        
        document.documentElement.style.fontSize = `${fontSize.scale}rem`;
    }
    
    // Apply font family
    applyFontFamily() {
        const fontFamily = this.fontFamilies[this.fontFamily];
        if (!fontFamily) return;
        
        document.body.style.fontFamily = fontFamily.family;
    }
    
    // Set theme
    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            localStorage.setItem('app_theme', themeName);
            this.applyTheme();
        }
    }
    
    // Set font size
    setFontSize(size) {
        if (this.fontSizes[size]) {
            this.fontSize = size;
            localStorage.setItem('app_font_size', size);
            this.applyFontSize();
        }
    }
    
    // Set font family
    setFontFamily(family) {
        if (this.fontFamilies[family]) {
            this.fontFamily = family;
            localStorage.setItem('app_font_family', family);
            this.applyFontFamily();
        }
    }
    
    // Get current settings
    getCurrentSettings() {
        return {
            theme: this.currentTheme,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily
        };
    }
    
    // Get available options
    getAvailableOptions() {
        return {
            themes: this.themes,
            fontSizes: this.fontSizes,
            fontFamilies: this.fontFamilies
        };
    }
}

// Settings Manager
class SettingsManager {
    constructor() {
        this.themeManager = new ThemeManager();
        this.settings = {
            notifications: localStorage.getItem('notifications_enabled') === 'true',
            vibration: localStorage.getItem('vibration_enabled') !== 'false', // Default true
            sound: localStorage.getItem('sound_enabled') !== 'false', // Default true
            autoLocation: localStorage.getItem('auto_location') !== 'false', // Default true
            prayerMethod: localStorage.getItem('prayer_method') || 'Makkah',
            mapProvider: localStorage.getItem('map_provider') || 'OpenStreetMap'
        };
    }
    
    // Show settings modal
    showSettings() {
        this.createSettingsModal();
        document.getElementById('settingsModal').style.display = 'block';
    }
    
    // Create settings modal
    createSettingsModal() {
        const existingModal = document.getElementById('settingsModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.className = 'modal';
        
        const currentLang = translationManager.getCurrentLanguage();
        const isAlbanian = currentLang === 'sq';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <span class="close" onclick="closeSettings()">&times;</span>
                <h2>⚙️ ${isAlbanian ? 'Cilësimet' : 'Settings'}</h2>
                
                <!-- Theme Settings -->
                <div class="settings-section">
                    <h3>${isAlbanian ? 'Tema' : 'Theme'}</h3>
                    <div class="settings-grid">
                        ${this.createThemeOptions()}
                    </div>
                </div>
                
                <!-- Font Settings -->
                <div class="settings-section">
                    <h3>${isAlbanian ? 'Teksti' : 'Text'}</h3>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Madhësia e tekstit:' : 'Font size:'}</label>
                        <select id="fontSizeSelect" onchange="changeFontSize(this.value)">
                            ${this.createFontSizeOptions()}
                        </select>
                    </div>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Lloji i fontit:' : 'Font family:'}</label>
                        <select id="fontFamilySelect" onchange="changeFontFamily(this.value)">
                            ${this.createFontFamilyOptions()}
                        </select>
                    </div>
                </div>
                
                <!-- Notification Settings -->
                <div class="settings-section">
                    <h3>${isAlbanian ? 'Njoftimet' : 'Notifications'}</h3>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Aktivizo njoftimet:' : 'Enable notifications:'}</label>
                        <input type="checkbox" id="notificationsToggle" ${this.settings.notifications ? 'checked' : ''} onchange="toggleNotifications(this.checked)">
                    </div>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Dridhje:' : 'Vibration:'}</label>
                        <input type="checkbox" id="vibrationToggle" ${this.settings.vibration ? 'checked' : ''} onchange="toggleVibration(this.checked)">
                    </div>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Zëri:' : 'Sound:'}</label>
                        <input type="checkbox" id="soundToggle" ${this.settings.sound ? 'checked' : ''} onchange="toggleSound(this.checked)">
                    </div>
                </div>
                
                <!-- Prayer Settings -->
                <div class="settings-section">
                    <h3>${isAlbanian ? 'Namazi' : 'Prayer'}</h3>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Metoda e llogaritjes:' : 'Calculation method:'}</label>
                        <select id="prayerMethodSelect" onchange="changePrayerMethod(this.value)">
                            ${this.createPrayerMethodOptions()}
                        </select>
                    </div>
                    <div class="settings-row">
                        <label>${isAlbanian ? 'Vendndodhja automatike:' : 'Auto location:'}</label>
                        <input type="checkbox" id="autoLocationToggle" ${this.settings.autoLocation ? 'checked' : ''} onchange="toggleAutoLocation(this.checked)">
                    </div>
                </div>
                
                <!-- Reset Settings -->
                <div class="settings-section">
                    <button onclick="resetSettings()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        ${isAlbanian ? 'Rivendos Cilësimet' : 'Reset Settings'}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    createThemeOptions() {
        const themes = this.themeManager.getAvailableOptions().themes;
        const currentTheme = this.themeManager.getCurrentSettings().theme;
        
        return Object.entries(themes).map(([key, theme]) => `
            <div class="theme-option ${key === currentTheme ? 'active' : ''}" onclick="changeTheme('${key}')">
                <div class="theme-preview" style="background: ${theme.primary}; border: 2px solid ${theme.secondary};"></div>
                <span>${theme.name}</span>
            </div>
        `).join('');
    }
    
    createFontSizeOptions() {
        const fontSizes = this.themeManager.getAvailableOptions().fontSizes;
        const currentSize = this.themeManager.getCurrentSettings().fontSize;
        
        return Object.entries(fontSizes).map(([key, size]) => 
            `<option value="${key}" ${key === currentSize ? 'selected' : ''}>${size.name}</option>`
        ).join('');
    }
    
    createFontFamilyOptions() {
        const fontFamilies = this.themeManager.getAvailableOptions().fontFamilies;
        const currentFamily = this.themeManager.getCurrentSettings().fontFamily;
        
        return Object.entries(fontFamilies).map(([key, family]) => 
            `<option value="${key}" ${key === currentFamily ? 'selected' : ''}>${family.name}</option>`
        ).join('');
    }
    
    createPrayerMethodOptions() {
        const methods = ['MWL', 'ISNA', 'Egypt', 'Makkah', 'Karachi'];
        return methods.map(method => 
            `<option value="${method}" ${method === this.settings.prayerMethod ? 'selected' : ''}>${method}</option>`
        ).join('');
    }
    
    // Update setting
    updateSetting(key, value) {
        this.settings[key] = value;
        localStorage.setItem(key, value.toString());
    }
}

// Initialize managers
const themeManager = new ThemeManager();
const settingsManager = new SettingsManager();

// Global functions for settings
function showSettings() {
    settingsManager.showSettings();
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

function changeTheme(themeName) {
    themeManager.setTheme(themeName);
    // Update active theme option
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.theme-option').classList.add('active');
}

function changeFontSize(size) {
    themeManager.setFontSize(size);
}

function changeFontFamily(family) {
    themeManager.setFontFamily(family);
}

function toggleNotifications(enabled) {
    settingsManager.updateSetting('notifications_enabled', enabled);
    if (enabled && 'Notification' in window) {
        Notification.requestPermission();
    }
}

function toggleVibration(enabled) {
    settingsManager.updateSetting('vibration_enabled', enabled);
}

function toggleSound(enabled) {
    settingsManager.updateSetting('sound_enabled', enabled);
}

function toggleAutoLocation(enabled) {
    settingsManager.updateSetting('auto_location', enabled);
}

function changePrayerMethod(method) {
    settingsManager.updateSetting('prayer_method', method);
    // Update prayer times calculator
    if (window.PrayerTimesCalculator) {
        const calculator = new PrayerTimesCalculator();
        calculator.setMethod(method);
    }
}

function resetSettings() {
    const isAlbanian = translationManager.getCurrentLanguage() === 'sq';
    const confirmMessage = isAlbanian ? 
        'A jeni të sigurt që doni të rivendosni të gjitha cilësimet?' :
        'Are you sure you want to reset all settings?';
    
    if (confirm(confirmMessage)) {
        localStorage.clear();
        location.reload();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, SettingsManager };
} else {
    window.ThemeManager = ThemeManager;
    window.SettingsManager = SettingsManager;
    window.themeManager = themeManager;
    window.settingsManager = settingsManager;
}

