# Changelog

## [0.2.0] - 07.09.2026

### Dodano:
- Dodano interaktywny, biały panel ze szczegółowymi informacjami, osadzony w lewej krawędzi kadru mapy.
- Akcję w okienku podręcznym wyzwalającą zaawansowany widok obrębu.

### Zmieniono:
- Rozszerzono widok mapy na całe okno przeglądarki.
- Nazwy obszarów od 44 do 60 w pliku `dane.js` na odpowiadające im nazwy sołectw (np. Racula, Przylep, Ochla).

## [0.1.0] - 04.09.2026

### Dodano:

### 1. index.html:
 - Odpowiada za osadzenie kontenera #map oraz podpięcie biblioteki Leaflet, arkusza stylów i skryptów JavaScript.

### 2. css/style.css:
 - Odpowiada za wymiary i wygląd okna mapy, estetykę okienek informacyjnych (popup) oraz stylizację przezroczystych etykiet z numerami obrębów.

### 3. js/dane.js:
 - Przechowywanie słownika obszaryData zawierającego opisy dla wszystkich 60 obrębów.

### 4. js/script.js:
- Odpowiada za inicjalizację mapy (podkład Esri World Street Map), pobranie GeoJSONa, nakładanie numerów na obszary oraz obsługę interakcji (podświetlanie po najechaniu i popupy po kliknięciu).

### 5. obszary.json:
 - Wektorowe granice geodezyjne 60 obrębów Zielonej Góry pozyskane z danych państwowych (Geoportal / PRG).