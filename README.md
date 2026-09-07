## Interaktywna mapa Zielonej Góry
### Michał Dajerling

Projekt interaktywnej mapy internetowej prezentującej podział administracyjny Zielonej Góry.

---

### Funkcjonalności
- Wyświetlanie wektorowych granic wszystkich 60 obrębów ewidencyjnych na podkładzie Esri World Street Map.
- Stałe numerowanie obszarów (1-60) zgodnie z PRG.
- Dynamiczna zmiana stylistyki obszaru po najechaniu kursorem myszy.
- Okienko informacyjne z przyciskiem akcji *„Wybierz”*.
- Pasek ze szczegółami po lewej stronie ekranu uruchamiany po wybraniu obrębu.
- Płynne przybliżenie do wybranego obszaru z uwzględnieniem szerokości wysuniętego panelu.

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
