import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LayerControl from './LayerControl';
import { CubeIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const HEADER_HEIGHT_PX = 76;

export default function Map({ isVisible }) {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const sourcesLoadedRef = useRef(new Set());
    const layersAddedRef = useRef(new Set());
    const isMapLoadedRef = useRef(false);
    const mapInsetRef = useRef(null);
    const mapInsetInstanceRef = useRef(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/navigation-day-v1');
    const [is3DMode, setIs3DMode] = useState(false);

    const iconPaths = {

    };

    // --- Initial Layers Configuration ---
    const initialLayers = [
        {
            id: 'batas-admin-group',
            name: 'Batas Administrasi',
            visible: true,
            layers: [{
                id: 'batas-admin-layer',
                sourceId: 'batas-admin-source',
                source: '/data/admin.json',
                type: 'line',
                paint: {
                    'line-color': '#FFDE63',
                    'line-width': 5,
                    'line-dasharray': [2, 1]
                },
                layout: {
                    visibility: 'visible'
                }
            }],
        },
        {
            id: 'penggunaan-lahan-group',
            name: 'Penggunaan Lahan',
            visible: true,
            layers: [
                {
                    id: 'penggunaan-lahan-layer',
                    sourceId: 'penggunaan-lahan-source',
                    source: '/data/PL.json',
                    type: 'fill',
                    paint: {
                        'fill-color': [
                            'match',
                            ['get', 'KETERANGAN'],
                            'Sungai', '#4a90e2',
                            'Tempat Tinggal', '#e57373',
                            'Sawah', '#81c784',
                            'Kebun Campur', '#aed581',
                            'Rumput', '#c5e1a5',
                            'Tegalan/Ladang', '#d4a373',
                            'Lahan Terbuka (Tanah Kosong)', '#b0bec5',
                            'Hutan', '#388e3c',
                            'Peternakan', '#ffb74d',
                            'Perkebunan', '#558b2f',
                            'Perdagangan dan Jasa', '#ff8a65',
                            'Pendidikan', '#7986cb',
                            'Peribadatan', '#9575cd',
                            'Telekomunikasi', '#64b5f6',
                            'Perikanan air tawar', '#4fc3f7',
                            'Pekarangan', '#a5d6a7',
                            'Pemakaman', '#757575',
                            'Semak Belukar', '#7cb342',
                            'Industri dan Perdagangan', '#a1887f',
                            'Vegetasi Non Budidaya Lainnya', '#66bb6a',
                            '#a5a5a5',
                        ],
                        'fill-opacity': 0.7,
                    },
                    layout: {
                        visibility: 'visible'
                    }
                },
            ],
        },
        {
            id: 'bangunan-group',
            name: 'Bangunan',
            visible: true,
            layers: [
                {
                    id: 'bangunan-layer',
                    sourceId: 'bangunan-source',
                    source: '/data/Bangunan.json',
                    type: 'fill-extrusion',
                    paint: {
                        'fill-extrusion-color': '#d9a86b',
                        'fill-extrusion-height': [
                            'interpolate', ['linear'], ['zoom'],
                            15, 0,
                            15.05, ['get', 'height'] || 10
                        ],
                        'fill-extrusion-base': 0,
                        'fill-extrusion-opacity': 0.8,
                    },
                    layout: {
                        visibility: 'visible'
                    }
                },
                {
                    id: 'bangunan-titik-layer',
                    sourceId: 'bangunan-titik-source',
                    source: '/data/bangunan_titik.json',
                    type: 'circle',
                    paint: {
                        'circle-color': '#00BFFF',
                        'circle-radius': 6,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#FFFFFF'
                    },
                    layout: {
                        visibility: 'visible'
                    }
                }
            ],
        },
        {
            id: 'transportasi-group',
            name: 'Jaringan Infrastruktur Transportasi',
            visible: true,
            layers: [
                {
                    id: 'jalan-layer',
                    sourceId: 'jalan-source',
                    source: '/data/Jalan.json',
                    type: 'line',
                    paint: {
                        'line-color': [
                            'match',
                            ['get', 'KETERANGAN'],
                            'Jalan Lain', '#ff6f00',
                            'Jalan Lokal', '#bf360c',
                            'Jalan Setapak', '#8d6e63',
                            'Lokal', '#d32f2f',
                            'Pematang', '#a1887f',
                            '#d0021b',
                        ],
                        'line-width': [
                            'match',
                            ['get', 'KETERANGAN'],
                            'Jalan Lain', 3,
                            'Jalan Lokal', 4,
                            'Jalan Setapak', 1,
                            'Lokal', 4,
                            'Pematang', 1,
                            2.5,
                        ],
                    },
                    layout: {
                        visibility: 'visible'
                    }
                },
            ],
        },
        {
            id: 'perairan-group',
            name: 'Perairan',
            visible: true,
            layers: [{
                id: 'sungai-line-layer',
                sourceId: 'sungai-source',
                source: '/data/Sungai.json',
                type: 'line',
                paint: {
                    'line-color': '#4a90e2',
                    'line-width': 2,
                    'line-opacity': 0.9
                },
                layout: {
                    visibility: 'visible'
                }
            }],
        },
        {
            id: 'umkm-group',
            name: 'Usaha Mikro, Kecil, dan Menengah (UMKM)',
            visible: true,
            layers: [
                {
                    id: 'umkm-circle-layer', // Layer untuk simbol lingkaran
                    sourceId: 'umkm-source',
                    source: '/data/umkm.json',
                    type: 'circle',
                    paint: {
                        'circle-color': '#FFD700', // Warna Gold
                        'circle-radius': 7,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#FFFFFF'
                    },
                    layout: {
                        visibility: 'visible'
                    }
                },
                {
                    id: 'umkm-label-layer', // Layer baru untuk label teks
                    sourceId: 'umkm-source', // Menggunakan sumber data yang sama
                    source: '/data/umkm.json', // Sumber data perlu tetap ada jika dimuat secara dinamis
                    type: 'symbol', // Tipe layer untuk teks/simbol
                    paint: {
                        'text-color': '#FFFFFF', // Warna teks label
                        'text-halo-color': '#000000', // Warna outline teks
                        'text-halo-width': 1,
                    },
                    layout: {
                        'text-field': ['get', 'Title'], // Mengambil teks dari properti 'Title'
                        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], // Font teks
                        'text-size': 14, // Ukuran teks
                        'text-offset': [0, 1.5], // Offset teks dari titik (di atas lingkaran)
                        'text-anchor': 'top', // Penempatan teks relatif terhadap titik
                        'text-allow-overlap': true, // Memungkinkan label tumpang tindih
                        'visibility': 'visible'
                    }
                }
            ]
        }
    ];
    // --- End Initial Layers Configuration ---

    const [layers, setLayers] = useState(initialLayers);

    const loadGeoJSONData = useCallback(async (url) => {
        try {
            console.log(`Loading GeoJSON from: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || typeof data !== 'object') {
                throw new Error('Invalid JSON structure');
            }

            if (data.type !== 'FeatureCollection' && data.type !== 'Feature') {
                throw new Error(`Invalid GeoJSON type: ${data.type}`);
            }

            if (data.type === 'FeatureCollection' && !Array.isArray(data.features)) {
                throw new Error('FeatureCollection must have features array');
            }

            console.log(`Successfully loaded ${url} with ${data.features?.length || 1} features`);
            return data;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            throw error;
        }
    }, []);

    const addSourceToMap = useCallback((map, sourceId, data) => {
        if (map.getSource(sourceId)) {
            console.log(`Source ${sourceId} already exists, updating data...`);
            map.getSource(sourceId).setData(data);
            return;
        }

        try {
            map.addSource(sourceId, {
                type: 'geojson',
                data: data
            });
            sourcesLoadedRef.current.add(sourceId);
            console.log(`Source ${sourceId} added successfully`);
        } catch (error) {
            console.error(`Error adding source ${sourceId}:`, error);
        }
    }, []);

    const addLayerToMap = useCallback((map, layerConfig, beforeId = null) => {
        if (map.getLayer(layerConfig.id)) {
            console.log(`Layer ${layerConfig.id} already exists, skipping...`);
            return;
        }

        if (!map.getSource(layerConfig.sourceId)) {
            console.error(`Source ${layerConfig.sourceId} not found for layer ${layerConfig.id}`);
            return;
        }

        try {
            const layerDefinition = {
                id: layerConfig.id,
                type: layerConfig.type,
                source: layerConfig.sourceId,
                layout: layerConfig.layout || { visibility: 'visible' },
                paint: layerConfig.paint || {}
            };

            map.addLayer(layerDefinition, beforeId);
            layersAddedRef.current.add(layerConfig.id);
            console.log(`Layer ${layerConfig.id} added successfully ${beforeId ? 'before ' + beforeId : ''}`);
        } catch (error) {
            console.error(`Error adding layer ${layerConfig.id}:`, error);
        }
    }, []);

    const loadAllLayers = useCallback(async (map) => {
        if (!isMapLoadedRef.current) {
            console.log('Map not loaded yet, waiting...');
            return;
        }

        console.log('Loading all layers...');

        // Custom PNG icons (if any, although "Sarana Prasarana" group is removed)
        for (const iconName in iconPaths) {
            if (Object.hasOwnProperty.call(iconPaths, iconName)) {
                if (!map.hasImage(iconName)) {
                    console.log(`Adding image: ${iconName} from ${iconPaths[iconName]}`);
                    const img = new Image();
                    img.src = iconPaths[iconName];
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            try {
                                map.addImage(iconName, img);
                                resolve();
                            } catch (e) {
                                console.error(`Error adding image ${iconName} to map:`, e);
                                reject(e);
                            }
                        };
                        img.onerror = (err) => {
                            console.error(`Failed to load image for ${iconName} from ${iconPaths[iconName]}:`, err);
                            reject(err);
                        };
                    });
                }
            }
        }
        console.log('All custom PNG icons added to map.');


        // Define the order of layers explicitly
        const layerOrder = [
            { groupId: 'batas-admin-group', beforeId: null },
            { groupId: 'perairan-group', beforeId: null },
            { groupId: 'penggunaan-lahan-group', beforeId: null },
            { groupId: 'bangunan-group', beforeId: 'transportasi-group' },
            { groupId: 'transportasi-group', beforeId: 'umkm-group-start' }, // Add a reference ID for UMKM group
            { groupId: 'umkm-group', beforeId: null },
        ];

        for (const order of layerOrder) {
            const group = layers.find(l => l.id === order.groupId);
            if (!group) continue;

            for (const layerConfig of group.layers) {
                try {
                    // Load source only once for a given sourceId
                    if (!map.getSource(layerConfig.sourceId)) {
                        const data = await loadGeoJSONData(layerConfig.source);
                        addSourceToMap(map, layerConfig.sourceId, data);
                    }

                    if (!map.getLayer(layerConfig.id)) {
                        let actualBeforeId = order.beforeId;
                        // For umkm-group, ensure umkm-label-layer is above umkm-circle-layer
                        if (layerConfig.id === 'umkm-label-layer') {
                            actualBeforeId = 'umkm-circle-layer'; // Place label above circle
                        } else if (actualBeforeId && !map.getLayer(actualBeforeId)) {
                            actualBeforeId = null;
                        }

                        let buildingBeforeId = null;
                        if (layerConfig.id === 'bangunan-layer' && is3DMode) {
                            buildingBeforeId = 'waterway-label';
                        }

                        addLayerToMap(map, layerConfig, buildingBeforeId || actualBeforeId);
                    }

                    map.setLayoutProperty(layerConfig.id, 'visibility', group.visible ? 'visible' : 'none');

                    await new Promise(resolve => setTimeout(resolve, 50));
                } catch (error) {
                    console.error(`Failed to load layer ${layerConfig.id}:`, error);
                }
            }
        }

        if (is3DMode) {
            if (!map.getSource('mapbox-dem')) {
                map.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
            }
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        } else {
            if (map.getTerrain()) {
                map.setTerrain(null);
            }
        }

        console.log('All layers loaded');
    }, [layers, loadGeoJSONData, addSourceToMap, addLayerToMap, is3DMode, iconPaths]);

    // Initialize main map
    useEffect(() => {
        if (!isVisible || !mapContainerRef.current || mapInstanceRef.current) {
            return;
        }

        console.log('Initializing main map...');

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapStyle,
            center: [110.1815, -7.5564],
            zoom: 15,
            pitch: is3DMode ? 60 : 0,
            bearing: is3DMode ? -17.6 : 0,
            antialias: true
        });

        mapInstanceRef.current = map;

        map.on('load', () => {
            console.log('Main Map loaded successfully');
            isMapLoadedRef.current = true;
            loadAllLayers(map);
        });

        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-left');
        map.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left');

        map.on('error', (e) => {
            console.error('Map error:', e);
        });

        const initializeMapInset = () => {
            if (mapInsetRef.current && !mapInsetInstanceRef.current) {
                mapInsetInstanceRef.current = new mapboxgl.Map({
                    container: mapInsetRef.current,
                    style: mapStyle,
                    center: [110.1815, -7.5564],
                    zoom: 8,
                    interactive: false,
                    attributionControl: false
                });

                mapInsetInstanceRef.current.on('load', () => {
                    console.log('Map Inset loaded successfully');
                    map.on('move', () => {
                        if (mapInsetInstanceRef.current) {
                            const bounds = map.getBounds();
                            if (mapInsetInstanceRef.current.getLayer('inset-bounds')) {
                                mapInsetInstanceRef.current.removeLayer('inset-bounds');
                            }
                            if (mapInsetInstanceRef.current.getSource('inset-bounds')) {
                                mapInsetInstanceRef.current.removeSource('inset-bounds');
                            }

                            mapInsetInstanceRef.current.addSource('inset-bounds', {
                                type: 'geojson',
                                data: {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [[
                                            [bounds.getWest(), bounds.getSouth()],
                                            [bounds.getEast(), bounds.getSouth()],
                                            [bounds.getEast(), bounds.getNorth()],
                                            [bounds.getEast(), bounds.getNorth()],
                                            [bounds.getWest(), bounds.getNorth()],
                                            [bounds.getWest(), bounds.getSouth()]
                                        ]]
                                    }
                                }
                            });
                            mapInsetInstanceRef.current.addLayer({
                                id: 'inset-bounds',
                                type: 'line',
                                source: 'inset-bounds',
                                paint: {
                                    'line-color': '#FF0000',
                                    'line-width': 2,
                                    'line-dasharray': [2, 1]
                                }
                            });

                            mapInsetInstanceRef.current.setCenter(map.getCenter());
                            mapInsetInstanceRef.current.setZoom(map.getZoom() > 4 ? map.getZoom() - 4 : 0);
                            mapInsetInstanceRef.current.setBearing(map.getBearing());
                            mapInsetInstanceRef.current.setPitch(map.getPitch());
                        }
                    });
                });
            }
        };
        initializeMapInset();


        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                isMapLoadedRef.current = false;
                sourcesLoadedRef.current.clear();
                layersAddedRef.current.clear();
            }
            if (mapInsetInstanceRef.current) {
                mapInsetInstanceRef.current.remove();
                mapInsetInstanceRef.current = null;
            }
        };
    }, [isVisible, loadAllLayers, mapStyle, is3DMode]);

    // Update map style when mapStyle state changes
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (map && map.isStyleLoaded() && map.getStyle().sprite !== mapStyle) {
            map.setStyle(mapStyle);
            map.on('style.load', () => {
                loadAllLayers(map);
            });
        }
        const insetMap = mapInsetInstanceRef.current;
        if (insetMap && insetMap.isStyleLoaded() && insetMap.getStyle().sprite !== mapStyle) {
            insetMap.setStyle(mapStyle);
        }
    }, [mapStyle, loadAllLayers]);


    // Setup event listeners for clickable layers (popups and cursor)
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map || !isMapLoadedRef.current) return;

        const clickableLayers = [
            'bangunan-titik-layer',
            'penggunaan-lahan-layer',
            'jalan-layer',
            'umkm-circle-layer', // Klik pada lingkaran akan memicu popup
            'umkm-label-layer',  // Klik pada label juga akan memicu popup
            // Add 'bangunan-layer' if you want popups for polygon buildings too
        ];

        clickableLayers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.on('click', layerId, (e) => {
                    const feature = e.features[0];
                    if (!feature) return;

                    const coordinates = feature.geometry.type === 'Point'
                        ? feature.geometry.coordinates.slice()
                        : feature.properties._center_coords
                            ? JSON.parse(feature.properties._center_coords)
                            : e.lngLat.toArray();

                    const properties = feature.properties;
                    let popupContent = '<div class="text-white">';

                    // Add a title based on common property names
                    if (properties.nama_pemil) { // For bangunan_titik.json
                        popupContent += `<strong class="text-blue-400">${properties.nama_pemil}</strong><br>`;
                    } else if (properties.KETERANGAN) { // For Jalan.json and PL.json
                        popupContent += `<strong class="text-blue-400">${properties.KETERANGAN}</strong><br>`;
                    } else if (properties.Title) { // For umkm.json
                        popupContent += `<strong class="text-blue-400">${properties.Title}</strong><br>`;
                    } else if (properties.name) { // General fallback for 'name'
                        popupContent += `<strong class="text-blue-400">${properties.name}</strong><br>`;
                    } else if (properties.id) {
                        popupContent += `<strong class="text-blue-400">Feature ID: ${properties.id}</strong><br>`;
                    } else {
                        popupContent += `<strong class="text-blue-400">Information</strong><br>`;
                    }

                    // Iterate through all properties, excluding common internal ones
                    for (const key in properties) {
                        if (Object.hasOwnProperty.call(properties, key) &&
                            key !== 'id' &&
                            key !== 'FID' &&
                            key !== 'OBJECTID' &&
                            key !== '_Koordinat' && // Exclude coordinates from raw display
                            key !== '_Koordin_1' && // Exclude coordinates from raw display
                            key !== '_center_coords' && // Exclude internal center coords
                            key !== 'SHAPE_Leng' && // Exclude shape properties
                            key !== 'SHAPE_Area' && // Exclude shape properties
                            key !== 'Title' && // Already handled as main title
                            key !== 'KETERANGAN' && // Already handled as main title
                            key !== 'nama_pemil' && // Already handled as main title
                            key !== 'name' && // Already handled as main title
                            key !== 'height' && // Exclude height for buildings as it's for 3D extrusion
                            properties[key] !== null &&
                            properties[key] !== "" &&
                            properties[key] !== " " &&
                            properties[key] !== 0 // Exclude zero values if they represent empty data
                        ) {
                            let value = properties[key];
                            if (typeof value === 'number') {
                                // Format numbers for better readability if they are not too small
                                value = parseFloat(value.toFixed(4));
                            }
                            popupContent += `<span class="text-sm text-gray-300">${key.replace(/_/g, ' ')}: ${value}</span><br>`;
                        }
                    }

                    popupContent += '</div>';

                    // Ensure coordinates are within valid range for popup
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    new mapboxgl.Popup({
                        className: 'dark-popup',
                        closeButton: true,
                        closeOnClick: true,
                    })
                        .setLngLat(coordinates)
                        .setHTML(popupContent)
                        .addTo(map);
                });

                map.on('mouseenter', layerId, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', layerId, () => {
                    map.getCanvas().style.cursor = '';
                });
            }
        });

        return () => {
            if (map) {
                clickableLayers.forEach(layerId => {
                    if (map.getLayer(layerId)) {
                        map.off('click', layerId);
                        map.off('mouseenter', layerId);
                        map.off('mouseleave', layerId);
                    }
                });
            }
        };
    }, [layers]);

    const handleLayerToggle = useCallback((groupId) => {
        const map = mapInstanceRef.current;
        if (!map || !isMapLoadedRef.current) return;

        setLayers(prevLayers => {
            const newLayers = prevLayers.map(group => {
                if (group.id === groupId) {
                    const newVisibility = !group.visible;

                    group.layers.forEach(layerConfig => {
                        if (map.getLayer(layerConfig.id)) {
                            map.setLayoutProperty(layerConfig.id, 'visibility', newVisibility ? 'visible' : 'none');

                            if (layerConfig.id === 'bangunan-layer' && map.getLayer(layerConfig.id)) {
                                if (newVisibility && is3DMode) {
                                    map.setPaintProperty('bangunan-layer', 'fill-extrusion-height', [
                                        'interpolate', ['linear'], ['zoom'],
                                        15, 0,
                                        15.05, ['get', 'height'] || 10
                                    ]);
                                } else {
                                    map.setPaintProperty('bangunan-layer', 'fill-extrusion-height', 0);
                                }
                            }

                        } else if (newVisibility) {
                            loadGeoJSONData(layerConfig.source)
                                .then(async data => {
                                    if (!map.getSource(layerConfig.sourceId)) {
                                        addSourceToMap(map, layerConfig.sourceId, data);
                                    } else {
                                        map.getSource(layerConfig.sourceId).setData(data);
                                    }

                                    // If it's a symbol layer, ensure its PNG image is loaded
                                    if (layerConfig.type === 'symbol' && layerConfig.layout && layerConfig.layout['icon-image']) {
                                        const iconName = layerConfig.layout['icon-image'];
                                        if (iconPaths[iconName] && !map.hasImage(iconName)) { // Hanya load jika ada di iconPaths
                                            console.log(`Adding missing image for toggled layer: ${iconName}`);
                                            const img = new Image();
                                            img.src = iconPaths[iconName];
                                            await new Promise((resolve, reject) => {
                                                img.onload = () => {
                                                    try {
                                                        map.addImage(iconName, img);
                                                        resolve();
                                                    } catch (e) {
                                                        console.error(`Error adding image ${iconName} to map during toggle:`, e);
                                                        reject(e);
                                                    }
                                                };
                                                img.onerror = (err) => {
                                                    console.error(`Failed to load image for ${iconName} during toggle:`, err);
                                                    reject(err);
                                                };
                                            });
                                        }
                                    }

                                    let beforeId = null;
                                    // Make sure umkm-label-layer is added above umkm-circle-layer if they are in the same group
                                    if (layerConfig.id === 'umkm-label-layer') {
                                        beforeId = 'umkm-circle-layer';
                                    } else if (layerConfig.id === 'bangunan-layer') {
                                        beforeId = 'transportasi-group';
                                    }
                                    addLayerToMap(map, layerConfig, beforeId);
                                    map.setLayoutProperty(layerConfig.id, 'visibility', 'visible');

                                    if (layerConfig.id === 'bangunan-layer' && is3DMode) {
                                        map.setPaintProperty('bangunan-layer', 'fill-extrusion-height', [
                                            'interpolate', ['linear'], ['zoom'],
                                            15, 0,
                                            15.05, ['get', 'height'] || 10
                                        ]);
                                    }
                                })
                                .catch(error => {
                                    console.error(`Failed to load layer ${layerConfig.id} during toggle:`, error);
                                });
                        }
                    });

                    return { ...group, visible: newVisibility };
                }
                return group;
            });

            return newLayers;
        });
    }, [loadGeoJSONData, addSourceToMap, addLayerToMap, is3DMode, iconPaths]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleMapMode = () => {
        setMapStyle(prevStyle =>
            prevStyle === 'mapbox://styles/mapbox/navigation-day-v1'
                ? 'mapbox://styles/mapbox/navigation-night-v1'
                : 'mapbox://styles/mapbox/navigation-day-v1'
        );
    };

    const toggle3DMode = useCallback(() => {
        setIs3DMode(prev => !prev);
        const map = mapInstanceRef.current;
        if (map) {
            if (!is3DMode) {
                map.setBearing(-17.6);
                map.setPitch(60);
                if (!map.getSource('mapbox-dem')) {
                    map.addSource('mapbox-dem', {
                        'type': 'raster-dem',
                        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        'tileSize': 512,
                        'maxzoom': 14
                    });
                }
                map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

                if (map.getLayer('bangunan-layer')) {
                    map.setPaintProperty('bangunan-layer', 'fill-extrusion-height', [
                        'interpolate', ['linear'], ['zoom'],
                        15, 0,
                        15.05, ['get', 'height'] || 10
                    ]);
                }

            } else {
                map.setBearing(0);
                map.setPitch(0);
                if (map.getTerrain()) {
                    map.setTerrain(null);
                }
                if (map.getLayer('bangunan-layer')) {
                    map.setPaintProperty('bangunan-layer', 'fill-extrusion-height', 0);
                }
            }
        }
    }, [is3DMode]);


    if (!isVisible) return null;

    return (
        <div className="fixed left-0 right-0 bottom-0 z-40" style={{ top: `${HEADER_HEIGHT_PX}px` }}>
            <div ref={mapContainerRef} className="w-full h-full absolute top-0 left-0" />

            <div
                className={`absolute top-0 h-full transition-all duration-300 ease-in-out z-50 overflow-hidden bg-gray-800 bg-opacity-95`}
                style={{ width: isSidebarOpen ? '25%' : '0', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
            >
                {isSidebarOpen && <LayerControl layers={layers} onToggle={handleLayerToggle} />}
            </div>

            <button
                onClick={toggleSidebar}
                className="absolute top-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200"
                title={isSidebarOpen ? 'Hide Layer Control' : 'Show Layer Control'}
                style={{ left: isSidebarOpen ? 'calc(25% + 1rem)' : '1rem' }}
            >
                {isSidebarOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </button>

            <button
                onClick={toggleMapMode}
                className="absolute top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200"
                title="Toggle Day/Night Mode"
            >
                {mapStyle === 'mapbox://styles/mapbox/navigation-day-v1' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.5l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707-.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>

            <button
                onClick={toggle3DMode}
                className="absolute top-16 right-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200"
                title="Toggle 3D Mode"
            >
                {is3DMode ? (
                    <Squares2X2Icon className="h-6 w-6" />
                ) : (
                    <CubeIcon className="h-6 w-6" />
                )}
            </button>

            <div
                ref={mapInsetRef}
                className="absolute bottom-4 right-4 w-48 h-36 border-2 border-blue-500 rounded-lg overflow-hidden shadow-xl z-50 bg-gray-900"
                style={{ pointerEvents: 'none' }}
            />
            <style jsx>{`
        /* Keep your existing dark-popup styles */
        :global(.dark-popup) {
          background-color: rgba(30, 30, 30, 0.95) !important;
          color: white !important;
          border-radius: 6px !important;
          border: 1px solid #444 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        :global(.dark-popup .mapboxgl-popup-content) {
          background-color: rgba(30, 30, 30, 0.95) !important;
          padding: 12px !important;
        }
        :global(.dark-popup .mapboxgl-popup-tip) {
          border-top-color: rgba(30, 30, 30, 0.95) !important;
          border-bottom-color: rgba(30, 30, 30, 0.95) !important;
        }
        :global(.dark-popup .mapboxgl-popup-close-button) {
          color: #bbb !important;
          font-size: 18px !important;
          top: 6px !important;
          right: 6px !important;
          transition: color 0.2s ease-in-out;
        }
        :global(.dark-popup .mapboxgl-popup-close-button:hover) {
          color: white !important;
        }
      `}</style>
        </div>
    );
}