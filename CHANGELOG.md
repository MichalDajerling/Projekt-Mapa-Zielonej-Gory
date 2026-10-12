# Changelog

## [12.10.2026]

### Dodano

- Nowe obszary:
  - ZP14, ZP15, ZP16 dla `parki_miejskie`.
- Nr działek dla:
  - D01, D02 (`tereny_komunikacji`).

## [08.10.2026]

### Dodano

- Nowe obszary:
  - ZP11, ZP12, ZP13 dla `parki_miejskie`.
- Nr działek dla:
  - ZP02, ZP04, ZP06, ZP07, ZP08 (`parki_miejskie`),
  - P01, P02 (`strefy_przem`).

## [07.10.2026]

### Dodano

- Nowe obszary:
  - ZP09, ZP10 dla `parki_miejskie`.
- Nr działek dla:
  - OD01, OD02 (`ogrody_dzialkowe`),
  - TZ01, TZ02, TZ03 (`os_mieszkaniowe_i_uslugowe`).


## [06.10.2026]

### Dodano

- Nowe obszary:
  - ZP07, ZP08 dla `parki_miejskie`.
- Nr działek dla:
  - ZL01, ZL02, ZL03 (`lasy`),
  - TO01, TO02 (`obszary_chronione`)

## [05.10.2026]

### Dodano

- Nowe obszary:
  - ZP06 dla `parki_miejskie`.
- Nr działek dla:
  - ZLP01, ZLP02, ZLP03, ZLP04 (`parki_lesne`).

## [0.3.1] - 17.09.2026

### Dodano

- Nowe obszary:
  - OW03 dla `ogrody_willowe`,
  - TZ03 dla `os_mieszkaniowe_i_uslugowe`,
  - ZH03 oraz ZH04 dla `parki_historyczne`,
  - ZL03 dla `lasy`,
  - ZLP03 oraz ZLP04 dla `parki_lesne`,
  - ZP03,ZP04 i ZP05 dla `parki_miejskie`.
- Kolory obrysów w panelu kontrolnym z warstwami.
- Możliwośc zwinięcia panelu kontrolnego z warstwami.
- Po wybraniu danego obszaru wyskakuje okno z szczegółowymi informacjami dla tego obszaru.

### Naprawiono

- Wyświetlanie nazw dla `strefy_przem`.
- Obrys `TW01` zakrywał `ZC01` co powodowało brak możliwości sprawdzenia szczegółów dla `ZC01`.

## [0.3.0] - 14.09.2026

### Dodano
- Podział obszarów Zielonej Góry na osobne kategorie warstw:
  - Cmentarze (`cmentarze`),
  - Lasy (`lasy`),
  - Obszary chronione (`obszary_chronione`),
  - Ogrody działkowe (`ogrody_dzialkowe`),
  - Ogrody willowe (`ogrody_willowe`),
  - Osiedla mieszkaniowe i usługowe (`os_mieszkaniowe_i_uslugowe`),
  - Parki historyczne (`parki_historyczne`),
  - Parki leśne (`parki_lesne`),
  - Parki miejskie (`parki_miejskie`),
  - Strefy przemysłowe (`strefy_przem`),
  - Tereny komunikacji (`tereny_komunikacji`),
  - Tereny rolnicze (`tereny_rol`),
  - Wsie (`wsie`).
- Panel kontrolny w prawym górnym rogu mapy z obsługą:
  - Filtrowania i przełączania widoczności poszczególnych obszarów,
  - Przełączania trybu wyświetlania etykiet między ID a nazwą obszaru.

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