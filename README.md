# Interaktywna mapa Zielonej Góry
### Michał Dajerling

Projekt interaktywnej mapy internetowej prezentującej podział przestrzenny i funkcjonalny Zielonej Góry z możliwością filtracji i przełączania warstw.

[Aplikacja](https://michaldajerling.github.io/Projekt-Mapa-Zielonej-Gory/)

---

### Funkcjonalności
- Podział na kategorie obszarów: Pogrupowanie terenów Zielonej Góry na 13 kategorii tematycznych (m.in. lasy, parki, osiedla, strefy przemysłowe, wsie, cmentarze).
- Panel kontrolny:
  - Dynamiczne filtrowanie - przełączanie widoczności poszczególnych kategoryzowanych warstw mapy.
  - Przełączanie etykiet - zmiana trybu wyświetlania podpisów na mapie między ID a nazwą obszaru.
- Interaktywność i oprawa wizualna:
  - Dedykowana kolorystyka warstw.
  - Dynamiczne podświetlenie obszaru po najechaniu kursorem myszy (efekt hover).
  - Okienko informacyjne (popup) z przyciskiem akcji *„Wybierz”*.
  - Boczny panel szczegółów z informacjami o wybranym obszarze.
  - Płynne przybliżenie (zoom) do wskazanego obszaru z uwzględnieniem szerokości bocznego panelu.
- Podkład mapowy: Esri World Street Map.

---

### Wykorzystane technologie
- HTML5: Struktura strony, stylizacja paneli kontrolnych, okien modalnych i etykiet mapy.
- JavaScript: Logika aplikacji, dynamiczne zarządzanie warstwami, obsługa zdarzeń i filtrowanie.
- Leaflet.js: Biblioteka do obsługi interaktywnej mapy.
- GeoJSON: Dane przestrzenne obszarów i ich granic.

---

### Struktura plików
- `css/style.css` - Stylizacja interfejsu, paska bocznego, panelu filtrów oraz etykiet.
- `js/script.js` - Główna logika aplikacji (inicjalizacja Leaflet, ładowanie warstw, obsługa filtrowania i etykiet).
- `obszary/` - Podzielone katalogi z danymi przestrzennymi GeoJSON:
  - `cmentarze/`
  - `lasy/`
  - `obszary_chronione/`
  - `ogrody_dzialkowe/`
  - `ogrody_willowe/`
  - `os_mieszkaniowe_i_uslugowe/`
  - `parki_historyczne/`
  - `parki_lesne/`
  - `parki_miejskie/`
  - `strefy_przem/`
  - `tereny_komunikacji/`
  - `tereny_rol/`
  - `wsie/`
- `CHANGELOG.md` - Dziennik zmian i rozwoju projektu.
- `index.html` - Główny plik osadzający mapę i skrypty.
- `README.md` - Dokumentacja projektu.

---

### Jak uruchomić
1. Sklonuj repozytorium lub pobierz pliki projektu.
2. Otwórz projekt w edytorze kodów (np. VS Code).
3. Uruchom plik `index.html` przy użyciu lokalnego serwera (np. rozszerzenia **Live Server**), aby uniknąć blokad CORS podczas wczytywania plików GeoJSON.