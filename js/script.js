// inicjalizacja mapy Leaflet - ustawienie początkowego widoku i przybliżenia na obszarze Zielonej Góry
const map = L.map('map', {
  center: [51.9356, 15.5064],
  zoom: 12
});

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

// wczytanie danych GeoJSON z pliku obszary.json i dodanie ich do mapy
fetch('obszary.json')
  .then(response => response.json())
  .then(geojsonData => {
    const geojsonLayer = L.geoJSON(geojsonData, {
      style: defaultStyle,
      onEachFeature: function(feature, layer) {
        const index = geojsonData.features.indexOf(feature);
        const id = getObrebId(feature, index);

        // przypisanie identyfikatora obszaru do warstwy
        if (id) {
          layer.bindTooltip(id, {
            permanent: true,
            direction: 'center',
            className: 'area-label'
          });
        }

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyle);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonLayer.resetStyle(e.target);
          },
          click: function(e) {
            const info = obszaryData[id] || { nazwa: "Obręb " + id, opis: "Brak dodatkowego opisu." };
            
            L.popup()
              .setLatLng(e.latlng)
              .setContent('<div class="popup-content"><h3>' + info.nazwa + '</h3><p>' + info.opis + '</p></div>')
              .openOn(map);
          }
        });
      }
    }).addTo(map);

    // dopasowanie widoku i przybliżenia mapy do granic wczytanych obszarów
    map.fitBounds(geojsonLayer.getBounds());
  });
