// inicjalizacja mapy Leaflet - ustawienie początkowego widoku i przybliżenia na obszarze Zielonej Góry
const map = L.map('map', {
  center: [51.9356, 15.5064],
  zoom: 12
});

// wczytanie podkładu mapy z serwisu Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
}).addTo(map);

// kolorowanie obszarów na mapie
const defaultStyle = {
  color: "#2b5c8f",
  weight: 1.5,
  fillColor: "#3388ff",
  fillOpacity: 0.25
};

// kolorowanie obszarów po najechaniu myszką
const hoverStyle = {
  color: "#1e3a8a",
  weight: 3,
  fillColor: "#2563eb",
  fillOpacity: 0.55
};

// pobranie elementów interfejsu panelu bocznego
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarContent = document.getElementById('sidebar-content');

// obsługa zamknięcia panelu bocznego przyciskiem
sidebarClose.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// słownik przechowujący warstwy obszarów do obsługi przybliżania
const obrebLayers = {};

// funkcja do pobierania identyfikatora obszaru z właściwości GeoJSON
function getObrebId(feature, index) {
  const p = feature.properties || {};
  
  if (p.JPT_NAZWA_) {
    const val = parseInt(p.JPT_NAZWA_, 10);
    if (!isNaN(val)) return String(val);
  }
  if (p.NR_OBREBU) {
    const val = parseInt(p.NR_OBREBU, 10);
    if (!isNaN(val)) return String(val);
  }
  if (p.JPT_KOD_JE || p.TERYT) {
    const teryt = String(p.JPT_KOD_JE || p.TERYT);
    if (teryt.includes('.')) {
      const val = parseInt(teryt.split('.').pop(), 10);
      if (!isNaN(val)) return String(val);
    }
  }
  
  return String(index + 1);
}

// funkcja formatująca tytuł (np. "Obręb nr 1" lub "Obręb nr 44 - Racula")
function formatTitle(id, info) {
  if (info && info.nazwa && !info.nazwa.startsWith("Obręb")) {
    return `Obręb nr ${id} - ${info.nazwa}`;
  }
  return `Obręb nr ${id}`;
}

// funkcja aktywowana po kliknięciu przycisku "Wybierz" - przybliża mapę i wysuwa panel boczny
window.selectObreb = function(id) {
  const layer = obrebLayers[id];
  const info = obszaryData[id] || { opis: "Brak dodatkowego opisu." };
  const tytul = formatTitle(id, info);

  // przybliżenie mapy do wybranych granic obszaru
  if (layer) {
    map.fitBounds(layer.getBounds(), { padding: [40, 40] });
  }

  // zamknięcie wyskakującego okienka popup
  map.closePopup();

  // wypełnienie panelu bocznego danymi i wysunięcie go
  sidebarContent.innerHTML = `
    <h2 class="sidebar-title">${tytul}</h2>
    <p class="sidebar-desc">${info.opis}</p>
  `;
  sidebar.classList.add('active');
};

// wczytanie danych GeoJSON z pliku obszary.json i dodanie ich do mapy
fetch('obszary.json')
  .then(response => response.json())
  .then(geojsonData => {
    const geojsonLayer = L.geoJSON(geojsonData, {
      style: defaultStyle,
      onEachFeature: function(feature, layer) {
        const index = geojsonData.features.indexOf(feature);
        const id = getObrebId(feature, index);
        
        // zapamiętanie warstwy pod jej identyfikatorem
        obrebLayers[id] = layer;

        // przypisanie stałej etykiety z numerem obszaru
        if (id) {
          layer.bindTooltip(id, {
            permanent: true,
            direction: 'center',
            className: 'area-label'
          });
        }

        // obsługa interakcji myszą dla każdego obszaru
        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyle);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonLayer.resetStyle(e.target);
          },
          click: function(e) {
            const info = obszaryData[id] || { opis: "Brak dodatkowego opisu." };
            const tytul = "Obręb nr " + id;
            
            // wygenerowanie zawartości okienka popup wraz z przyciskiem "Wybierz"
            const popupHTML = `
              <div class="popup-content">
                <h3>${tytul}</h3>
                <p>${info.opis}</p>
                <button class="btn-select" onclick="selectObreb('${id}')">Wybierz</button>
              </div>
            `;

            L.popup()
              .setLatLng(e.latlng)
              .setContent(popupHTML)
              .openOn(map);
          }
        });
      }
    }).addTo(map);

    // dopasowanie widoku i przybliżenia mapy do granic wczytanych obszarów
    map.fitBounds(geojsonLayer.getBounds());
  });
