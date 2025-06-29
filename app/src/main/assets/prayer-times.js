// Prayer Times Calculator
// Based on astronomical calculations

class PrayerTimesCalculator {
    constructor() {
        this.methods = {
            MWL: { // Muslim World League
                fajr: 18,
                isha: 17
            },
            ISNA: { // Islamic Society of North America
                fajr: 15,
                isha: 15
            },
            Egypt: { // Egyptian General Authority of Survey
                fajr: 19.5,
                isha: 17.5
            },
            Makkah: { // Umm Al-Qura University, Makkah
                fajr: 18.5,
                isha: 90 // minutes after Maghrib
            },
            Karachi: { // University of Islamic Sciences, Karachi
                fajr: 18,
                isha: 18
            }
        };
        
        this.currentMethod = 'Makkah'; // Default to Makkah method
    }
    
    // Calculate prayer times for a given date and location
    calculatePrayerTimes(date, latitude, longitude, timezone = 0) {
        const jd = this.julianDate(date);
        const decl = this.sunDeclination(jd);
        const eqt = this.equationOfTime(jd);
        
        // Calculate prayer times
        const times = {};
        
        // Fajr
        const fajrAngle = this.methods[this.currentMethod].fajr;
        times.fajr = this.calculateTime(latitude, decl, -fajrAngle, eqt, timezone);
        
        // Sunrise
        times.sunrise = this.calculateTime(latitude, decl, -0.833, eqt, timezone);
        
        // Dhuhr (Midday)
        times.dhuhr = this.calculateTime(latitude, decl, 0, eqt, timezone, true);
        
        // Asr
        const asrAngle = this.calculateAsrAngle(latitude, decl);
        times.asr = this.calculateTime(latitude, decl, asrAngle, eqt, timezone);
        
        // Maghrib (Sunset)
        times.maghrib = this.calculateTime(latitude, decl, -0.833, eqt, timezone, false, true);
        
        // Isha
        const ishaValue = this.methods[this.currentMethod].isha;
        if (ishaValue > 50) {
            // Minutes after Maghrib
            const maghribTime = this.timeToMinutes(times.maghrib);
            const ishaTime = maghribTime + ishaValue;
            times.isha = this.minutesToTime(ishaTime);
        } else {
            // Angle-based calculation
            times.isha = this.calculateTime(latitude, decl, -ishaValue, eqt, timezone);
        }
        
        return this.formatTimes(times);
    }
    
    // Calculate Julian date
    julianDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        
        return Math.floor(365.25 * (year + 4716)) + 
               Math.floor(30.6001 * (month + 1)) + 
               day + b - 1524.5;
    }
    
    // Calculate sun declination
    sunDeclination(jd) {
        const n = jd - 2451545.0;
        const l = (280.460 + 0.9856474 * n) % 360;
        const g = this.degToRad((357.528 + 0.9856003 * n) % 360);
        const lambda = this.degToRad(l + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
        
        return this.radToDeg(Math.asin(Math.sin(this.degToRad(23.439)) * Math.sin(lambda)));
    }
    
    // Calculate equation of time
    equationOfTime(jd) {
        const n = jd - 2451545.0;
        const l = this.degToRad((280.460 + 0.9856474 * n) % 360);
        const g = this.degToRad((357.528 + 0.9856003 * n) % 360);
        const lambda = l + this.degToRad(1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
        
        const alpha = Math.atan2(Math.cos(this.degToRad(23.439)) * Math.sin(lambda), Math.cos(lambda));
        const eqt = l - alpha;
        
        return this.radToDeg(eqt) * 4; // Convert to minutes
    }
    
    // Calculate prayer time
    calculateTime(lat, decl, angle, eqt, timezone, isMidday = false, isSunset = false) {
        if (isMidday) {
            return this.minutesToTime(720 - eqt / 60 + timezone * 60);
        }
        
        const latRad = this.degToRad(lat);
        const declRad = this.degToRad(decl);
        const angleRad = this.degToRad(angle);
        
        const cosH = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declRad)) / 
                     (Math.cos(latRad) * Math.cos(declRad));
        
        if (Math.abs(cosH) > 1) {
            return null; // No sunrise/sunset at this location and date
        }
        
        const h = this.radToDeg(Math.acos(cosH));
        const time = isSunset ? 
                    720 + h * 4 - eqt + timezone * 60 :
                    720 - h * 4 - eqt + timezone * 60;
        
        return this.minutesToTime(time);
    }
    
    // Calculate Asr angle
    calculateAsrAngle(lat, decl) {
        const latRad = this.degToRad(lat);
        const declRad = this.degToRad(decl);
        
        const shadowLength = 1 + Math.tan(Math.abs(latRad - declRad));
        const angle = this.radToDeg(Math.atan(1 / shadowLength));
        
        return 90 - angle;
    }
    
    // Utility functions
    degToRad(deg) {
        return deg * Math.PI / 180;
    }
    
    radToDeg(rad) {
        return rad * 180 / Math.PI;
    }
    
    timeToMinutes(time) {
        const parts = time.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    
    minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    
    formatTimes(times) {
        const formatted = {};
        for (const [prayer, time] of Object.entries(times)) {
            if (time) {
                formatted[prayer] = time;
            }
        }
        return formatted;
    }
    
    // Get prayer times for current location and date
    getCurrentPrayerTimes(latitude, longitude) {
        const now = new Date();
        const timezone = -now.getTimezoneOffset() / 60;
        
        return this.calculatePrayerTimes(now, latitude, longitude, timezone);
    }
    
    // Get next prayer time
    getNextPrayer(latitude, longitude) {
        const times = this.getCurrentPrayerTimes(latitude, longitude);
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        const prayerOrder = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
        
        for (const prayer of prayerOrder) {
            if (times[prayer]) {
                const prayerMinutes = this.timeToMinutes(times[prayer]);
                if (prayerMinutes > currentMinutes) {
                    return {
                        name: prayer,
                        time: times[prayer],
                        remaining: prayerMinutes - currentMinutes
                    };
                }
            }
        }
        
        // Next prayer is tomorrow's Fajr
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTimes = this.calculatePrayerTimes(tomorrow, latitude, longitude, -now.getTimezoneOffset() / 60);
        
        return {
            name: 'fajr',
            time: tomorrowTimes.fajr,
            remaining: (24 * 60) - currentMinutes + this.timeToMinutes(tomorrowTimes.fajr)
        };
    }
    
    // Set calculation method
    setMethod(method) {
        if (this.methods[method]) {
            this.currentMethod = method;
        }
    }
    
    // Get available methods
    getMethods() {
        return Object.keys(this.methods);
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrayerTimesCalculator;
} else {
    window.PrayerTimesCalculator = PrayerTimesCalculator;
}

