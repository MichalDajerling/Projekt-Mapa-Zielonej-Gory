// Inicjalizacja mapy Leaflet
const map = L.map('map', {
  center: [51.9356, 15.5064],
  zoom: 12
});

// Adresy podkładów mapy (używane też w mini-mapie w oknie modalnym)
const STREET_TILES_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
const ORTHO_TILES_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Podkład główny (mapa ulic Esri)
const streetLayer = L.tileLayer(STREET_TILES_URL, {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
});

// Podkład dodatkowy (ortofotomapa / zdjęcia lotnicze i satelitarne Esri)
const orthoLayer = L.tileLayer(ORTHO_TILES_URL, {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
});

// Aktualnie wybrany podkład: 'street' albo 'ortho'
let currentBasemap = 'street';
streetLayer.addTo(map);

// Przełącznik podkładu w lewym górnym rogu (pod przyciskami zoom)
const basemapControl = L.control({ position: 'topleft' });

basemapControl.onAdd = function() {
  const div = L.DomUtil.create('div', 'basemap-switch');
  div.innerHTML = `
    <label>
      <input type="checkbox" id="toggle-ortho">
      Ortofotomapa
    </label>
  `;

  L.DomEvent.disableClickPropagation(div);
  L.DomEvent.disableScrollPropagation(div);

  return div;
};

basemapControl.addTo(map);

// Styl domyślny obszarów chronionych
const defaultStyle = {
  color: "#2b5c8f",
  weight: 1.5,
  fillColor: "#3388ff",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na obszary chronione
const hoverStyle = {
  color: "#1e3a8a",
  weight: 3,
  fillColor: "#2563eb",
  fillOpacity: 0.55
};

// Styl domyślny dla lasów (zielony)
const defaultStyleLasy = {
  color: "#1e5e2f",
  weight: 1.5,
  fillColor: "#22c55e",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na lasy (zielony)
const hoverStyleLasy = {
  color: "#14532d",
  weight: 3,
  fillColor: "#16a34a",
  fillOpacity: 0.55
};

// Styl domyślny dla parków leśnych (oliwkowy)
const defaultStyleParkiLesne = {
  color: "#556b2f",
  weight: 1.5,
  fillColor: "#a2b969",
  fillOpacity: 0.35
};

// Styl po najechaniu myszką na parki leśne (oliwkowy)
const hoverStyleParkiLesne = {
  color: "#3b4a20",
  weight: 3,
  fillColor: "#80963e",
  fillOpacity: 0.65
};

// Styl domyślny dla cmentarzy (szary)
const defaultStyleCmentarze = {
  color: "#4b5563",
  weight: 1.5,
  fillColor: "#9ca3af",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na cmentarze (ciemnoszary)
const hoverStyleCmentarze = {
  color: "#1f2937",
  weight: 3,
  fillColor: "#6b7280",
  fillOpacity: 0.55
};

// Styl domyślny dla wsi (ciemnopomarańczowy)
const defaultStyleWsie = {
  color: "#c2410c",
  weight: 1.5,
  fillColor: "#ea580c",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na wsie (wyrazisty, rdzawo-pomarańczowy)
const hoverStyleWsie = {
  color: "#7c2d12",
  weight: 3,
  fillColor: "#c2410c",
  fillOpacity: 0.55
};

// Styl domyślny dla ogrodów działkowych (ciemny fiolet)
const defaultStyleOgrody = {
  color: "#581c87",
  weight: 1.5,
  fillColor: "#7e22ce",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na ogrody działkowe (ciemny fiolet)
const hoverStyleOgrody = {
  color: "#3b0764",
  weight: 3,
  fillColor: "#6b21a8",
  fillOpacity: 0.55
};

// Styl domyślny dla ogrodów willowych (bordowy)
const defaultStyleOgrodyWillowe = {
  color: "#580010",
  weight: 1.5,
  fillColor: "#800020",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na ogrody willowe (bordowy)
const hoverStyleOgrodyWillowe = {
  color: "#33000a",
  weight: 3,
  fillColor: "#600018",
  fillOpacity: 0.55
};

// Styl domyślny dla osiedli mieszkaniowych i usługowych (pomarańczowy)
const defaultStyleOsMieszkanioweIUslugowe = {
  color: "#c2410c",
  weight: 1.5,
  fillColor: "#f97316",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na osiedla mieszkaniowe i usługowe (pomarańczowy)
const hoverStyleOsMieszkanioweIUslugowe = {
  color: "#9a3412",
  weight: 3,
  fillColor: "#ea580c",
  fillOpacity: 0.55
};

// Styl domyślny dla parków miejskich (brązowy)
const defaultStyleParkiMiejskie = {
  color: "#5c2c0c",
  weight: 1.5,
  fillColor: "#8b4513",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na parki miejskie (brązowy)
const hoverStyleParkiMiejskie = {
  color: "#3d1d08",
  weight: 3,
  fillColor: "#6e360f",
  fillOpacity: 0.55
};

// Styl domyślny dla parków historycznych (jasnoniebieski)
const defaultStyleParkiHistoryczne = {
  color: "#0284c7",
  weight: 1.5,
  fillColor: "#38bdf8",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na parki historyczne (jasnoniebieski)
const hoverStyleParkiHistoryczne = {
  color: "#0369a1",
  weight: 3,
  fillColor: "#0284c7",
  fillOpacity: 0.55
};

// Styl domyślny dla stref przemysłowych (magenta)
const defaultStyleStrefyPrzem = {
  color: "#cc00cc",
  weight: 1.5,
  fillColor: "#ff00ff",
  fillOpacity: 0.35
};

// Styl po najechaniu myszką na strefy przemysłowe (magenta)
const hoverStyleStrefyPrzem = {
  color: "#ff00ff",
  weight: 3,
  fillColor: "#ff00ff",
  fillOpacity: 0.65
};

// Styl domyślny dla terenów komunikacji (czerwony)
const defaultStyleTerenyKomunikacji = {
  color: "#991b1b",
  weight: 1.5,
  fillColor: "#ef4444",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na tereny komunikacji (czerwony)
const hoverStyleTerenyKomunikacji = {
  color: "#7f1d1d",
  weight: 3,
  fillColor: "#dc2626",
  fillOpacity: 0.55
};

// Styl domyślny dla terenów rolniczych (żółty)
const defaultStyleTerenyRol = {
  color: "#ca8a04",
  weight: 1.5,
  fillColor: "#eab308",
  fillOpacity: 0.25
};

// Styl po najechaniu myszką na tereny rolnicze (żółty)
const hoverStyleTerenyRol = {
  color: "#854d0e",
  weight: 3,
  fillColor: "#ca8a04",
  fillOpacity: 0.55
};

// Pobranie elementów okna modalnego
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');
let miniMap = null;

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

const obrebLayers = {};
let geojsonLayer = null;
let geojsonLasyLayer = null;
let geojsonParkiLesneLayer = null;
let geojsonCmentarzeLayer = null;
let geojsonWsieLayer = null;
let geojsonOgrodyLayer = null;
let geojsonOgrodyWilloweLayer = null;
let geojsonOsMieszkanioweIUslugoweLayer = null;
let geojsonParkiMiejskieLayer = null;
let geojsonParkiHistoryczneLayer = null;
let geojsonStrefyPrzemLayer = null;
let geojsonTerenyKomunikacjiLayer = null;
let geojsonTerenyRolLayer = null;

// Tworzenie panelu filtrowania w prawym górnym rogu
const filterControl = L.control({ position: 'topright' });

filterControl.onAdd = function() {
  const div = L.DomUtil.create('div', 'map-filter-box');
  div.innerHTML = `
    <div class="filter-header" id="filter-header">
      <span>Warstwy mapy</span>
      <button type="button" class="filter-toggle-btn" id="toggle-filter-btn">▼</button>
    </div>
    <div class="filter-content" id="filter-content">
      <label>
        <input type="checkbox" id="toggle-layer" checked>
        <span class="color-badge" style="background-color: #3388ff; border-color: #2b5c8f;"></span>
        Obszary chronione
      </label>
      <label>
        <input type="checkbox" id="toggle-lasy" checked>
        <span class="color-badge" style="background-color: #22c55e; border-color: #1e5e2f;"></span>
        Lasy
      </label>
      <label>
        <input type="checkbox" id="toggle-parki-lesne" checked>
        <span class="color-badge" style="background-color: #a2b969; border-color: #556b2f;"></span>
        Parki leśne
      </label>
      <label>
        <input type="checkbox" id="toggle-cmentarze" checked>
        <span class="color-badge" style="background-color: #9ca3af; border-color: #4b5563;"></span>
        Cmentarze
      </label>
      <label>
        <input type="checkbox" id="toggle-wsie" checked>
        <span class="color-badge" style="background-color: #ea580c; border-color: #c2410c;"></span>
        Sołectwa
      </label>
      <label>
        <input type="checkbox" id="toggle-ogrody" checked>
        <span class="color-badge" style="background-color: #7e22ce; border-color: #581c87;"></span>
        Ogrody działkowe
      </label>
      <label>
        <input type="checkbox" id="toggle-ogrody-willowe" checked>
        <span class="color-badge" style="background-color: #800020; border-color: #580010;"></span>
        Ogrody willowe
      </label>
      <label>
        <input type="checkbox" id="toggle-os-mieszkaniowe-i-uslugowe" checked>
        <span class="color-badge" style="background-color: #f97316; border-color: #c2410c;"></span>
        Osiedla mieszkaniowe i usługowe
      </label>
      <label>
        <input type="checkbox" id="toggle-parki-miejskie" checked>
        <span class="color-badge" style="background-color: #8b4513; border-color: #5c2c0c;"></span>
        Parki miejskie
      </label>
      <label>
        <input type="checkbox" id="toggle-parki-historyczne" checked>
        <span class="color-badge" style="background-color: #38bdf8; border-color: #0284c7;"></span>
        Parki historyczne
      </label>
      <label>
        <input type="checkbox" id="toggle-strefy-przem" checked>
        <span class="color-badge" style="background-color: #ff00ff; border-color: #cc00cc;"></span>
        Strefy przemysłowe
      </label>
      <label>
        <input type="checkbox" id="toggle-tereny-komunikacji" checked>
        <span class="color-badge" style="background-color: #ef4444; border-color: #991b1b;"></span>
        Tereny komunikacji
      </label>
      <label>
        <input type="checkbox" id="toggle-tereny-rol" checked>
        <span class="color-badge" style="background-color: #eab308; border-color: #ca8a04;"></span>
        Tereny rolnicze
      </label>
      <label>
        <input type="checkbox" id="toggle-names">
        Wyświetlaj nazwy
      </label>
    </div>
  `;
  
  L.DomEvent.disableClickPropagation(div);
  L.DomEvent.disableScrollPropagation(div);

  const header = div.querySelector('#filter-header');
  const content = div.querySelector('#filter-content');
  const btn = div.querySelector('#toggle-filter-btn');

  header.addEventListener('click', () => {
    content.classList.toggle('collapsed');
    btn.textContent = content.classList.contains('collapsed') ? '▲' : '▼';
  });

  return div;
};

filterControl.addTo(map);

// Pobieranie identyfikatora z właściwości GeoJSON
function getObrebId(feature, index) {
  const p = feature.properties || {};
  if (p.id) return String(p.id);
  if (p.kod) return String(p.kod);
  return String(index + 1);
}

// Formatowanie tytułu w oknie modalnym / popupie
function formatTitle(id, info) {
  if (info && info.nazwa) {
    return info.nazwa;
  }
  return `Obszar nr ${id}`;
}

// Wybór obszaru i otwieranie okna modalnego (karty ewidencyjnej)
window.selectObreb = function(id) {
  const layer = obrebLayers[id];
  
  let info = { opis: "Brak dodatkowego opisu." };
  let categoryStyle = defaultStyle;
  let fotoFolder = '';

  if (typeof obszaryChronioneData !== 'undefined' && obszaryChronioneData[id]) {
    info = obszaryChronioneData[id];
    categoryStyle = defaultStyle;
    fotoFolder = 'obszary_chronione';
  } else if (typeof lasyData !== 'undefined' && lasyData[id]) {
    info = lasyData[id];
    categoryStyle = defaultStyleLasy;
    fotoFolder = 'lasy';
  } else if (typeof parkiLesneData !== 'undefined' && parkiLesneData[id]) {
    info = parkiLesneData[id];
    categoryStyle = defaultStyleParkiLesne;
    fotoFolder = 'parki_lesne';
  } else if (typeof cmentarzeData !== 'undefined' && cmentarzeData[id]) {
    info = cmentarzeData[id];
    categoryStyle = defaultStyleCmentarze;
    fotoFolder = 'cmentarze';
  } else if (typeof wsieData !== 'undefined' && wsieData[id]) {
    info = wsieData[id];
    categoryStyle = defaultStyleWsie;
    fotoFolder = 'wsie';
  } else if (typeof ogrodyDzialkoweData !== 'undefined' && ogrodyDzialkoweData[id]) {
    info = ogrodyDzialkoweData[id];
    categoryStyle = defaultStyleOgrody;
    fotoFolder = 'ogrody_dzialkowe';
  } else if (typeof ogrodyWilloweData !== 'undefined' && ogrodyWilloweData[id]) {
    info = ogrodyWilloweData[id];
    categoryStyle = defaultStyleOgrodyWillowe;
    fotoFolder = 'ogrody_willowe';
  } else if (typeof osMieszkanioweIUslugoweData !== 'undefined' && osMieszkanioweIUslugoweData[id]) {
    info = osMieszkanioweIUslugoweData[id];
    categoryStyle = defaultStyleOsMieszkanioweIUslugowe;
    fotoFolder = 'os_mieszkaniowe_i_uslugowe';
  } else if (typeof parkiMiejskieData !== 'undefined' && parkiMiejskieData[id]) {
    info = parkiMiejskieData[id];
    categoryStyle = defaultStyleParkiMiejskie;
    fotoFolder = 'parki_miejskie';
  } else if (typeof parkiHistoryczneData !== 'undefined' && parkiHistoryczneData[id]) {
    info = parkiHistoryczneData[id];
    categoryStyle = defaultStyleParkiHistoryczne;
    fotoFolder = 'parki_historyczne';
  } else if (typeof strefyPrzemysloweData !== 'undefined' && strefyPrzemysloweData[id]) {
    info = strefyPrzemysloweData[id];
    categoryStyle = defaultStyleStrefyPrzem;
    fotoFolder = 'strefy_przem';
  } else if (typeof terenyKomunikacjiData !== 'undefined' && terenyKomunikacjiData[id]) {
    info = terenyKomunikacjiData[id];
    categoryStyle = defaultStyleTerenyKomunikacji;
    fotoFolder = 'tereny_komunikacji';
  } else if (typeof terenyRolniczeData !== 'undefined' && terenyRolniczeData[id]) {
    info = terenyRolniczeData[id];
    categoryStyle = defaultStyleTerenyRol;
    fotoFolder = 'tereny_rol';
  }

  const tytul = formatTitle(id, info);

  if (layer) {
    map.fitBounds(layer.getBounds(), { padding: [40, 40] });
  }

  map.closePopup();

  // Galeria zdjęć: pliki w obszary/<folder>/<folder>_foto/<ID>_1.jpg, <ID>_2.jpg itd.
  // Podpisy pobierane są z tablicy "galeria" w pliku z danymi (kolejność = numer zdjęcia)
  const galeria = (info.galeria && info.galeria.length) ? info.galeria : [];
  let galeriaPrzyciskHTML = '';
  let galeriaWidokHTML = '';

  if (galeria.length > 0 && fotoFolder) {
    const zdjeciaHTML = galeria.map((foto, i) => `
      <figure class="gallery-item">
        <img src="obszary/${fotoFolder}/${fotoFolder}_foto/${id}_${i + 1}.jpg" alt="${foto.podpis || tytul}" loading="lazy" onerror="this.parentElement.style.display='none'">
        <figcaption class="gallery-caption">${foto.podpis || ''}</figcaption>
      </figure>
    `).join('');

    galeriaPrzyciskHTML = `<button type="button" class="btn-gallery" id="btn-gallery-open">Galeria</button>`;
    galeriaWidokHTML = `
      <div class="modal-gallery hidden-view" id="modal-gallery">
        <button type="button" class="btn-gallery-back" id="btn-gallery-back">← Wróć do karty</button>
        <div class="gallery-list">${zdjeciaHTML}</div>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${tytul}</h2>
    </div>
    <div class="modal-body">
      <div class="modal-info">
        <table class="card-table">
          <tr>
            <th>Adres / Miejscowość</th>
            <td>Zielona Góra</td>
          </tr>
          <tr>
            <th>Kategoria obiektu i charakterystyka</th>
            <td>${info.kategoria}<br>${info.opis}</td>
          </tr>
          <tr>
            <th>Użytkownicy / Właściciel</th>
            <td></td>
          </tr>
          <tr>
            <th>Działki</th>
            <td>${info.dzialki || 'Wg obrysu mapy'}</td>
          </tr>
          <tr>
            <th>Zabytki / Mała architektura</th>
            <td></td>
          </tr>
        </table>
        ${galeriaPrzyciskHTML}
      </div>
      <div class="modal-map-box">
        <div id="mini-map"></div>
      </div>
    </div>
    ${galeriaWidokHTML}
  `;

  modalOverlay.classList.add('active');

  // Przełączanie między kartą a galerią zdjęć
  const btnGalleryOpen = document.getElementById('btn-gallery-open');
  const btnGalleryBack = document.getElementById('btn-gallery-back');
  const modalBody = modalContent.querySelector('.modal-body');
  const modalGallery = document.getElementById('modal-gallery');

  if (btnGalleryOpen && modalGallery) {
    btnGalleryOpen.addEventListener('click', () => {
      modalBody.classList.add('hidden-view');
      modalGallery.classList.remove('hidden-view');
      modalContent.parentElement.scrollTop = 0;
    });

    btnGalleryBack.addEventListener('click', () => {
      modalGallery.classList.add('hidden-view');
      modalBody.classList.remove('hidden-view');
      if (miniMap) miniMap.invalidateSize();
    });
  }

  setTimeout(() => {
    if (miniMap) {
      miniMap.remove();
      miniMap = null;
    }

    // Inicjalizacja interaktywnej mini-mapy z możliwością przybliżania
    miniMap = L.map('mini-map', {
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: false,
      touchZoom: true,
      dragging: true,
      attributionControl: false
    });

    // Mini-mapa używa tego samego podkładu, co mapa główna
    L.tileLayer(currentBasemap === 'ortho' ? ORTHO_TILES_URL : STREET_TILES_URL, {
      maxZoom: 19
    }).addTo(miniMap);

    if (layer && layer.toGeoJSON) {
      const geojsonFeature = layer.toGeoJSON();
      
      const toggleNamesCheckbox = document.getElementById('toggle-names');
      const showFullNames = toggleNamesCheckbox ? toggleNamesCheckbox.checked : false;
      const labelText = (showFullNames && info.nazwa) ? info.nazwa : id;

      const miniLayer = L.geoJSON(geojsonFeature, {
        style: {
          color: categoryStyle.color || "#2b5c8f",
          weight: 2,
          fillColor: categoryStyle.fillColor || "#3388ff",
          fillOpacity: 0.5
        },
        onEachFeature: function(feature, miniSubLayer) {
          miniSubLayer.bindTooltip(labelText, {
            permanent: true,
            direction: 'center',
            className: 'area-label'
          });
        }
      }).addTo(miniMap);

      miniMap.fitBounds(miniLayer.getBounds(), { padding: [30, 30] });
    }

    miniMap.invalidateSize();
  }, 100);
};

// Wczytywanie danych GeoJSON dla obszarów chronionych
fetch('obszary/obszary_chronione/obszary_chronione.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonLayer = L.geoJSON(geojsonData, {
      style: defaultStyle,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof obszaryChronioneData !== 'undefined' && obszaryChronioneData[id]) 
          ? obszaryChronioneData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyle);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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

    if (geojsonLayer.getBounds().isValid()) {
      map.fitBounds(geojsonLayer.getBounds());
    }
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON obszarów chronionych:", error);
  });

// Wczytywanie danych GeoJSON dla lasów
fetch('obszary/lasy/lasy.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonLasyLayer = L.geoJSON(geojsonData, {
      style: defaultStyleLasy,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof lasyData !== 'undefined' && lasyData[id]) 
          ? lasyData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleLasy);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonLasyLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla lasów:", error);
  });

// Wczytywanie danych GeoJSON dla parków leśnych
fetch('obszary/parki_lesne/parki_lesne.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonParkiLesneLayer = L.geoJSON(geojsonData, {
      style: defaultStyleParkiLesne,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof parkiLesneData !== 'undefined' && parkiLesneData[id]) 
          ? parkiLesneData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleParkiLesne);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonParkiLesneLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla parków leśnych:", error);
  });

// Wczytywanie danych GeoJSON dla cmentarzy
fetch('obszary/cmentarze/cmentarze.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonCmentarzeLayer = L.geoJSON(geojsonData, {
      style: defaultStyleCmentarze,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof cmentarzeData !== 'undefined' && cmentarzeData[id]) 
          ? cmentarzeData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleCmentarze);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonCmentarzeLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla cmentarzy:", error);
  });

// Wczytywanie danych GeoJSON dla wsi
fetch('obszary/wsie/wsie.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonWsieLayer = L.geoJSON(geojsonData, {
      style: defaultStyleWsie,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof wsieData !== 'undefined' && wsieData[id]) 
          ? wsieData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleWsie);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonWsieLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla wsi:", error);
  });

// Wczytywanie danych GeoJSON dla ogrodów działkowych
fetch('obszary/ogrody_dzialkowe/ogrody_dzialkowe.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonOgrodyLayer = L.geoJSON(geojsonData, {
      style: defaultStyleOgrody,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof ogrodyDzialkoweData !== 'undefined' && ogrodyDzialkoweData[id]) 
          ? ogrodyDzialkoweData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleOgrody);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonOgrodyLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla ogrodów działkowych:", error);
  });

// Wczytywanie danych GeoJSON dla ogrodów willowych
fetch('obszary/ogrody_willowe/ogrody_willowe.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonOgrodyWilloweLayer = L.geoJSON(geojsonData, {
      style: defaultStyleOgrodyWillowe,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof ogrodyWilloweData !== 'undefined' && ogrodyWilloweData[id]) 
          ? ogrodyWilloweData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleOgrodyWillowe);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonOgrodyWilloweLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla ogrodów willowych:", error);
  });

// Wczytywanie danych GeoJSON dla osiedli mieszkaniowych i usługowych
fetch('obszary/os_mieszkaniowe_i_uslugowe/os_mieszkaniowe_i_uslugowe.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonOsMieszkanioweIUslugoweLayer = L.geoJSON(geojsonData, {
      style: defaultStyleOsMieszkanioweIUslugowe,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof osMieszkanioweIUslugoweData !== 'undefined' && osMieszkanioweIUslugoweData[id]) 
          ? osMieszkanioweIUslugoweData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleOsMieszkanioweIUslugowe);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonOsMieszkanioweIUslugoweLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla osiedli mieszkaniowych i usługowych:", error);
  });

// Wczytywanie danych GeoJSON dla parków miejskich
fetch('obszary/parki_miejskie/parki_miejskie.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonParkiMiejskieLayer = L.geoJSON(geojsonData, {
      style: defaultStyleParkiMiejskie,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof parkiMiejskieData !== 'undefined' && parkiMiejskieData[id]) 
          ? parkiMiejskieData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleParkiMiejskie);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonParkiMiejskieLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla parków miejskich:", error);
  });

// Wczytywanie danych GeoJSON dla parków historycznych
fetch('obszary/parki_historyczne/parki_historyczne.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonParkiHistoryczneLayer = L.geoJSON(geojsonData, {
      style: defaultStyleParkiHistoryczne,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof parkiHistoryczneData !== 'undefined' && parkiHistoryczneData[id]) 
          ? parkiHistoryczneData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleParkiHistoryczne);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonParkiHistoryczneLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla parków historycznych:", error);
  });

// Wczytywanie danych GeoJSON dla stref przemysłowych
fetch('obszary/strefy_przem/strefy_przem.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonStrefyPrzemLayer = L.geoJSON(geojsonData, {
      style: defaultStyleStrefyPrzem,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof strefyPrzemysloweData !== 'undefined' && strefyPrzemysloweData[id]) 
          ? strefyPrzemysloweData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleStrefyPrzem);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonStrefyPrzemLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla stref przemysłowych:", error);
  });

// Wczytywanie danych GeoJSON dla terenów komunikacji
fetch('obszary/tereny_komunikacji/tereny_komunikacji.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonTerenyKomunikacjiLayer = L.geoJSON(geojsonData, {
      style: defaultStyleTerenyKomunikacji,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof terenyKomunikacjiData !== 'undefined' && terenyKomunikacjiData[id]) 
          ? terenyKomunikacjiData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleTerenyKomunikacji);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonTerenyKomunikacjiLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla terenów komunikacji:", error);
  });

// Wczytywanie danych GeoJSON dla terenów rolniczych
fetch('obszary/tereny_rol/tereny_rol.json')
  .then(response => {
    if (!response.ok) throw new Error(`Błąd ładowania pliku: ${response.statusText}`);
    return response.json();
  })
  .then(geojsonData => {
    const itemsList = geojsonData.features || geojsonData.geometries || [];

    geojsonTerenyRolLayer = L.geoJSON(geojsonData, {
      style: defaultStyleTerenyRol,
      onEachFeature: function(feature, layer) {
        const index = itemsList.indexOf(feature);
        const id = getObrebId(feature, index);
        
        feature.calculatedId = id;
        obrebLayers[id] = layer;

        const info = (typeof terenyRolniczeData !== 'undefined' && terenyRolniczeData[id]) 
          ? terenyRolniczeData[id] 
          : { opis: "Brak dodatkowego opisu." };

        layer.bindTooltip(id, {
          permanent: true,
          direction: 'center',
          className: 'area-label'
        });

        layer.on({
          mouseover: function(e) {
            e.target.setStyle(hoverStyleTerenyRol);
            e.target.bringToFront();
          },
          mouseout: function(e) {
            geojsonTerenyRolLayer.resetStyle(e.target);
          },
          click: function(e) {
            const tytul = formatTitle(id, info);
            
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
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania danych GeoJSON dla terenów rolniczych:", error);
  });

// Obsługa zdarzeń dla checkboxów filtrowania
document.addEventListener('change', (e) => {
  if (e.target.id === 'toggle-ortho') {
    if (e.target.checked) {
      map.removeLayer(streetLayer);
      orthoLayer.addTo(map);
      currentBasemap = 'ortho';
    } else {
      map.removeLayer(orthoLayer);
      streetLayer.addTo(map);
      currentBasemap = 'street';
    }
    // Podkłady zawsze pod warstwami obszarów
    streetLayer.bringToBack();
    orthoLayer.bringToBack();
    document.body.classList.toggle('ortho-mode', currentBasemap === 'ortho');
  }

  if (e.target.id === 'toggle-layer') {
    if (geojsonLayer) {
      if (e.target.checked) map.addLayer(geojsonLayer);
      else map.removeLayer(geojsonLayer);
    }
  }

  if (e.target.id === 'toggle-lasy') {
    if (geojsonLasyLayer) {
      if (e.target.checked) map.addLayer(geojsonLasyLayer);
      else map.removeLayer(geojsonLasyLayer);
    }
  }

  if (e.target.id === 'toggle-parki-lesne') {
    if (geojsonParkiLesneLayer) {
      if (e.target.checked) map.addLayer(geojsonParkiLesneLayer);
      else map.removeLayer(geojsonParkiLesneLayer);
    }
  }

  if (e.target.id === 'toggle-cmentarze') {
    if (geojsonCmentarzeLayer) {
      if (e.target.checked) map.addLayer(geojsonCmentarzeLayer);
      else map.removeLayer(geojsonCmentarzeLayer);
    }
  }

  if (e.target.id === 'toggle-wsie') {
    if (geojsonWsieLayer) {
      if (e.target.checked) map.addLayer(geojsonWsieLayer);
      else map.removeLayer(geojsonWsieLayer);
    }
  }

  if (e.target.id === 'toggle-ogrody') {
    if (geojsonOgrodyLayer) {
      if (e.target.checked) map.addLayer(geojsonOgrodyLayer);
      else map.removeLayer(geojsonOgrodyLayer);
    }
  }

  if (e.target.id === 'toggle-ogrody-willowe') {
    if (geojsonOgrodyWilloweLayer) {
      if (e.target.checked) map.addLayer(geojsonOgrodyWilloweLayer);
      else map.removeLayer(geojsonOgrodyWilloweLayer);
    }
  }

  if (e.target.id === 'toggle-os-mieszkaniowe-i-uslugowe') {
    if (geojsonOsMieszkanioweIUslugoweLayer) {
      if (e.target.checked) map.addLayer(geojsonOsMieszkanioweIUslugoweLayer);
      else map.removeLayer(geojsonOsMieszkanioweIUslugoweLayer);
    }
  }

  if (e.target.id === 'toggle-parki-miejskie') {
    if (geojsonParkiMiejskieLayer) {
      if (e.target.checked) map.addLayer(geojsonParkiMiejskieLayer);
      else map.removeLayer(geojsonParkiMiejskieLayer);
    }
  }

  if (e.target.id === 'toggle-parki-historyczne') {
    if (geojsonParkiHistoryczneLayer) {
      if (e.target.checked) map.addLayer(geojsonParkiHistoryczneLayer);
      else map.removeLayer(geojsonParkiHistoryczneLayer);
    }
  }

  if (e.target.id === 'toggle-strefy-przem') {
    if (geojsonStrefyPrzemLayer) {
      if (e.target.checked) map.addLayer(geojsonStrefyPrzemLayer);
      else map.removeLayer(geojsonStrefyPrzemLayer);
    }
  }

  if (e.target.id === 'toggle-tereny-komunikacji') {
    if (geojsonTerenyKomunikacjiLayer) {
      if (e.target.checked) map.addLayer(geojsonTerenyKomunikacjiLayer);
      else map.removeLayer(geojsonTerenyKomunikacjiLayer);
    }
  }

  if (e.target.id === 'toggle-tereny-rol') {
    if (geojsonTerenyRolLayer) {
      if (e.target.checked) map.addLayer(geojsonTerenyRolLayer);
      else map.removeLayer(geojsonTerenyRolLayer);
    }
  }

  if (e.target.id === 'toggle-names') {
    const showFullNames = e.target.checked;

    if (geojsonLayer) {
      geojsonLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof obszaryChronioneData !== 'undefined' && obszaryChronioneData[id]) 
          ? obszaryChronioneData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonLasyLayer) {
      geojsonLasyLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof lasyData !== 'undefined' && lasyData[id]) 
          ? lasyData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonParkiLesneLayer) {
      geojsonParkiLesneLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof parkiLesneData !== 'undefined' && parkiLesneData[id]) 
          ? parkiLesneData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonCmentarzeLayer) {
      geojsonCmentarzeLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof cmentarzeData !== 'undefined' && cmentarzeData[id]) 
          ? cmentarzeData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonWsieLayer) {
      geojsonWsieLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof wsieData !== 'undefined' && wsieData[id]) 
          ? wsieData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonOgrodyLayer) {
      geojsonOgrodyLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof ogrodyDzialkoweData !== 'undefined' && ogrodyDzialkoweData[id]) 
          ? ogrodyDzialkoweData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonOgrodyWilloweLayer) {
      geojsonOgrodyWilloweLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof ogrodyWilloweData !== 'undefined' && ogrodyWilloweData[id]) 
          ? ogrodyWilloweData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonOsMieszkanioweIUslugoweLayer) {
      geojsonOsMieszkanioweIUslugoweLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof osMieszkanioweIUslugoweData !== 'undefined' && osMieszkanioweIUslugoweData[id]) 
          ? osMieszkanioweIUslugoweData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonParkiMiejskieLayer) {
      geojsonParkiMiejskieLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof parkiMiejskieData !== 'undefined' && parkiMiejskieData[id]) 
          ? parkiMiejskieData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonParkiHistoryczneLayer) {
      geojsonParkiHistoryczneLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof parkiHistoryczneData !== 'undefined' && parkiHistoryczneData[id]) 
          ? parkiHistoryczneData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonStrefyPrzemLayer) {
      geojsonStrefyPrzemLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof strefyPrzemysloweData !== 'undefined' && strefyPrzemysloweData[id]) 
          ? strefyPrzemysloweData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonTerenyKomunikacjiLayer) {
      geojsonTerenyKomunikacjiLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof terenyKomunikacjiData !== 'undefined' && terenyKomunikacjiData[id]) 
          ? terenyKomunikacjiData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }

    if (geojsonTerenyRolLayer) {
      geojsonTerenyRolLayer.eachLayer((layer) => {
        const id = layer.feature.calculatedId;
        const info = (typeof terenyRolniczeData !== 'undefined' && terenyRolniczeData[id]) 
          ? terenyRolniczeData[id] 
          : {};
        const newLabelText = (showFullNames && info.nazwa) ? info.nazwa : id;
        layer.setTooltipContent(newLabelText);
      });
    }
  }
});
