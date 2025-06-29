# 🕋 Aplikacioni Android për Haxhin

Një aplikacion Android i plotë për pelegrinazhin islamik (Haxh) me harta interaktive, llogaritës kohësh namazi, gjetës Kible dhe lista kontrolli.

## 🌟 Veçoritë Kryesore

- **🗺️ Harta Interaktive** - OpenStreetMap me Mekën, Medinën dhe pikat Miqat
- **🕐 Kohët e Namazit** - Llogaritje astronomike të sakta
- **🧭 Gjetësi i Kiblës** - Drejtim preciz me busull
- **✅ Lista e Kontrollit** - Gjurmim progresiv i ritualeve
- **🌐 Shumëgjuhësi** - Shqip dhe Anglisht
- **🎨 Personalizim** - 4 tema dhe opsione teksti
- **📱 Offline Ready** - Funksionalitet i plotë pa internet

## 📱 Kompatibiliteti

- **Android:** 5.0+ (API Level 21+)
- **Madhësia:** ~15MB
- **RAM:** Minimum 2GB
- **Storage:** 50MB i lirë

## 🚀 Instalimi i Shpejtë

### Për Përdoruesit
1. Shkarkoni APK nga [Releases](releases/)
2. Aktivizoni "Unknown Sources" në cilësimet e Android
3. Instaloni APK-në
4. Hapni aplikacionin dhe shijoni!

### Për Zhvilluesit

```bash
# Klononi projektin
git clone [repository-url]
cd hajj_app

# Ndërtoni APK
./gradlew assembleDebug

# Instaloni në pajisje
adb install app/build/outputs/apk/debug/app-debug.apk
```

## 📖 Dokumentacioni

- **[Dokumentacioni i Plotë](hajj_app_documentation.pdf)** - Udhëzues i detajuar
- **[API Reference](docs/api.md)** - Dokumentacioni teknik
- **[User Guide](docs/user-guide.md)** - Udhëzues për përdoruesit

## 🛠️ Teknologjitë e Përdorura

- **Android WebView** - Container kryesor
- **HTML5/CSS3/JavaScript** - Frontend
- **OpenStreetMap** - Hartat interaktive
- **Leaflet.js** - Biblioteka e hartave
- **Service Workers** - Funksionaliteti offline

## 📁 Struktura e Projektit

```
hajj_app/
├── app/
│   ├── src/main/
│   │   ├── java/com/example/hajjapp/
│   │   │   └── MainActivity.java
│   │   ├── assets/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── app.js
│   │   │   ├── prayer-times.js
│   │   │   ├── translations.js
│   │   │   ├── settings.js
│   │   │   └── images/
│   │   └── res/
│   └── build.gradle
├── build.gradle
└── README.md
```

## 🎯 Veçoritë e Detajuara

### Harta Interaktive
- **Meka:** Qabja, Safa, Merva, Arafat, Muzdelife, Mina
- **Miqatet:** Dhul Hulaifa, Juhfa, Qarn al-Manazil, Yalamlam, Dhat Irq
- **Medina:** Xhamia e Profetit, Kuba, Baki, Uhud

### Llogaritësi i Namazit
- **Metoda:** MWL, ISNA, Egypt, Makkah, Karachi
- **GPS Integration:** Vendndodhja automatike
- **Namazi i Ardhshëm:** Countdown timer

### Lista e Kontrollit
- **Përgatitja:** 6 detyra
- **Udhëtimi:** 4 detyra  
- **Ritualet e Haxhit:** 11 detyra
- **Vizitat në Medinë:** 6 detyra

## 🌍 Gjuhët e Mbështetura

- 🇦🇱 **Shqip** (Albanian)
- 🇬🇧 **Anglisht** (English)

*Gjuhë të tjera do të shtohen në versione të ardhshme*

## 🎨 Temat e Disponueshme

1. **Jeshile/Artë** (Parazgjedhur)
2. **E Errët** 
3. **E Çelët**
4. **Blu/Artë**

## 📱 Screenshots

| Faqja Kryesore | Harta | Kohët e Namazit | Lista e Kontrollit |
|----------------|-------|-----------------|-------------------|
| ![Home](screenshots/home.png) | ![Map](screenshots/map.png) | ![Prayer](screenshots/prayer.png) | ![Checklist](screenshots/checklist.png) |

## 🤝 Kontributi

Mirëpresim kontributet! Ju lutemi lexoni [CONTRIBUTING.md](CONTRIBUTING.md) për udhëzime.

### Si të Kontribuoni
1. Fork projektin
2. Krijoni një branch (`git checkout -b feature/AmazingFeature`)
3. Commit ndryshimet (`git commit -m 'Add some AmazingFeature'`)
4. Push në branch (`git push origin feature/AmazingFeature`)
5. Hapni një Pull Request

## 📄 Licenca

Ky projekt është i licensuar nën MIT License - shikoni [LICENSE](LICENSE) për detaje.

## 📞 Mbështetja

- **Email:** support@hajjapp.com
- **Issues:** [GitHub Issues](issues/)
- **Dokumentacioni:** [docs.hajjapp.com](https://docs.hajjapp.com)

## 🙏 Falënderime

- **OpenStreetMap** për hartat e lira
- **Leaflet.js** për bibliotekën e hartave
- **Komunitetit Musliman** për feedback dhe mbështetje

## 📈 Roadmap

### v1.1 (Q3 2025)
- [ ] Gjuhë shtesë (Arabisht, Turqisht)
- [ ] Widget Android
- [ ] Backup në cloud

### v1.2 (Q4 2025)
- [ ] Realiteti i shtuar për Kiblën
- [ ] Komunitet i përdoruesve
- [ ] Harta offline

### v2.0 (Q1 2026)
- [ ] AI Assistant
- [ ] Live streaming nga Harami
- [ ] Harta 3D

---

**Zhvilluar me ❤️ për komunitetin musliman**

*Allahu na e lehtësoftë Haxhin për të gjithë!* 🤲

