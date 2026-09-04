## Interaktywna mapa Zielonej Góry
### Michał Dajerling

Projekt interaktywnej mapy internetowej prezentującej podział administracyjny Zielonej Góry.

---

### Funkcjonalności
- Wyświetlanie wektorowych granic wszystkich 60 obrębów ewidencyjnych na podkładzie Esri World Street Map.
- Stałe numerowanie obszarów (1-60) zgodnie z PRG.
- Dynamiczna zmiana stylistyki obszaru po najechaniu kursorem myszy.
- Szczegółowe okienka informacyjne po kliknięciu w dany obręb.

---

### Wykorzystane technologie
- HTML5: Struktura strony i nowoczesne stylizowanie etykiet oraz kontenera mapy.
- JavaScript: Logika biznesowa, nakładanie warstw i obsługa zdarzeń.
- Leaflet.js: Biblioteka do obsługi interaktywnych map.
- GeoJSON: Dane wektorowe granic geodezyjnych.

---

### Struktura plików
- `index.html` - Główny plik osadzający mapę i skrypty.
- `css/style.css` - Stylizacja okna mapy, popupów i etykiet `.area-label`.
- `js/script.js` - Główna logika (inicjalizacja mapy, parsowanie GeoJSON, obsługa zdarzeń).
- `js/dane.js` - Baza danych z opisami poszczególnych obrębów.
- `obszary.json` - Wektorowe dane przestrzenne obrębów.

---

### Jak uruchomić
1. Sklonuj repozytorium lub pobierz pliki projektu.
2. Otwórz projekt w edytorze (np. VS Code).
3. Uruchom plik `index.html` przez serwer lokalny (np. rozszerzenie Live Server), aby pominąć blokady CORS przy pobieraniu pliku JSON.
