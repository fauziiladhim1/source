import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LayerControl from './LayerControl'; // Assuming LayerControl.jsx is correct from previous iteration

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const HEADER_HEIGHT_PX = 76; // Assuming your header height remains the same

export default function Map({ isVisible }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const sourcesLoadedRef = useRef(new Set());
  const layersAddedRef = useRef(new Set());
  const isMapLoadedRef = useRef(false);
  const mapInsetRef = useRef(null);
  const mapInsetInstanceRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/navigation-day-v1'); // Day mode by default

  // --- Initial Layers Configuration (remains the same as per your last provided code) ---
  const initialLayers = [
    {
      id: 'batas-admin-group',
      name: 'Batas Administrasi',
      visible: true,
      layers: [{
        id: 'batas-admin-layer',
        sourceId: 'batas-admin-source',
        source: '/data/admin.json',
        type: 'fill',
        paint: {
          'fill-color': '#cccccc',
          'fill-opacity': 0.4,
          'fill-outline-color': '#63C8FF'
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
              '#a5a5a5', // Default color if no match
            ],
            'fill-opacity': 0.7,
          },
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'bangunan-layer',
          sourceId: 'bangunan-source',
          source: '/data/Bangunan.json',
          type: 'fill',
          paint: {
            'fill-color': '#d9a86b',
            'fill-opacity': 0.8
          },
          layout: {
            visibility: 'visible'
          }
        },
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
              '#d0021b', // Default color
            ],
            'line-width': [
              'match',
              ['get', 'KETERANGAN'],
              'Jalan Lain', 3,
              'Jalan Lokal', 4,
              'Jalan Setapak', 1,
              'Lokal', 4,
              'Pematang', 1,
              2.5, // Default width
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
        id: 'sungai-line-layer', // Changed ID to reflect line feature
        sourceId: 'sungai-source', // Changed sourceId
        source: '/data/Sungai.json', // Assuming this is now line data for rivers
        type: 'line', // Changed to line type
        paint: {
          'line-color': '#4a90e2', // Blue for rivers
          'line-width': 2, // Thicker line for rivers
          'line-opacity': 0.9
        },
        layout: {
          visibility: 'visible'
        }
      }],
    },
    {
      id: 'sarana-prasarana-group',
      name: 'Sarana dan Prasarana',
      visible: true,
      layers: [
        {
          id: 'telekomunikasi-layer',
          sourceId: 'telekomunikasi-source',
          source: '/data/Telekomunikasi.json',
          type: 'circle',
          paint: {
            'circle-color': '#64b5f6',
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
          },
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'peribadatan-layer',
          sourceId: 'peribadatan-source',
          source: '/data/Peribadatan.json',
          type: 'circle',
          paint: {
            'circle-color': '#9575cd',
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
          },
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'pendidikan-layer',
          sourceId: 'pendidikan-source',
          source: '/data/Pendidikan.json',
          type: 'circle',
          paint: {
            'circle-color': '#7986cb',
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
          },
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'pemakaman-layer',
          sourceId: 'pemakaman-source',
          source: '/data/Pemakaman.json',
          type: 'circle',
          paint: {
            'circle-color': '#757575',
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
          },
          layout: {
            visibility: 'visible'
          }
        },
        {
          id: 'industri-layer',
          sourceId: 'industri-source',
          source: '/data/Industri.json',
          type: 'circle',
          paint: {
            'circle-color': '#a1887f',
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2
          },
          layout: {
            visibility: 'visible'
          }
        },
      ],
    },
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

  const addLayerToMap = useCallback((map, layerConfig) => {
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

      map.addLayer(layerDefinition);
      layersAddedRef.current.add(layerConfig.id);
      console.log(`Layer ${layerConfig.id} added successfully`);
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

    for (const group of layers) {
      for (const layerConfig of group.layers) {
        try {
          if (!map.getSource(layerConfig.sourceId)) {
            const data = await loadGeoJSONData(layerConfig.source);
            addSourceToMap(map, layerConfig.sourceId, data);
          }

          if (!map.getLayer(layerConfig.id)) {
            addLayerToMap(map, layerConfig);
          }

          map.setLayoutProperty(layerConfig.id, 'visibility', group.visible ? 'visible' : 'none');

          // Add a small delay to ensure layers are added sequentially
          await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {
          console.error(`Failed to load layer ${layerConfig.id}:`, error);
        }
      }
    }

    console.log('All layers loaded');
  }, [layers, loadGeoJSONData, addSourceToMap, addLayerToMap]);

  // Initialize main map
  useEffect(() => {
    if (!isVisible || !mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    console.log('Initializing main map...');

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [110.1815, -7.5564], // Tasikmalaya coordinates
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    mapInstanceRef.current = map;

    map.on('load', () => {
      console.log('Main Map loaded successfully');
      isMapLoadedRef.current = true;
      loadAllLayers(map); // Load layers after the style is loaded and ready
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-left');
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left');

    map.on('error', (e) => {
      console.error('Map error:', e);
    });

    // Initialize map inset
    const initializeMapInset = () => {
      if (mapInsetRef.current && !mapInsetInstanceRef.current) {
        mapInsetInstanceRef.current = new mapboxgl.Map({
          container: mapInsetRef.current,
          style: mapStyle, // Use the same style as main map
          center: [110.1815, -7.5564], // Tasikmalaya as initial center for inset
          zoom: 8, // Broader zoom level for context in inset
          interactive: false, // Make it non-interactive
          attributionControl: false // Hide attribution for inset to keep it clean
        });

        mapInsetInstanceRef.current.on('load', () => {
          console.log('Map Inset loaded successfully');
          // Add a simple bounding box to the inset to show the main map's current view
          map.on('move', () => {
            if (mapInsetInstanceRef.current) {
              const bounds = map.getBounds();
              // Remove previous rectangle if it exists
              if (mapInsetInstanceRef.current.getLayer('inset-bounds')) {
                mapInsetInstanceRef.current.removeLayer('inset-bounds');
              }
              if (mapInsetInstanceRef.current.getSource('inset-bounds')) {
                mapInsetInstanceRef.current.removeSource('inset-bounds');
              }

              // Add a new source and layer for the bounding box
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
                  'line-color': '#FF0000', // Red color for the bounding box
                  'line-width': 2,
                  'line-dasharray': [2, 1]
                }
              });

              // Keep inset map centered on main map's center
              mapInsetInstanceRef.current.setCenter(map.getCenter());
              // Adjust inset zoom relative to main map to maintain context
              mapInsetInstanceRef.current.setZoom(map.getZoom() > 4 ? map.getZoom() - 4 : 0); // Ensure zoom doesn't go negative
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
  }, [isVisible, loadAllLayers, mapStyle]);

  // Update map style when mapStyle state changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && map.isStyleLoaded() && map.getStyle().sprite !== mapStyle) {
      map.setStyle(mapStyle);
      // Re-add layers after style change
      map.on('style.load', () => {
        loadAllLayers(map);
      });
    }
    const insetMap = mapInsetInstanceRef.current;
    if (insetMap && insetMap.isStyleLoaded() && insetMap.getStyle().sprite !== mapStyle) {
        insetMap.setStyle(mapStyle);
    }
  }, [mapStyle, loadAllLayers]);


  // Setup event listeners for point layers (popups and cursor)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoadedRef.current) return;

    const pointLayers = [
      'telekomunikasi-layer',
      'peribadatan-layer',
      'pendidikan-layer',
      'pemakaman-layer',
      'industri-layer'
    ];

    pointLayers.forEach(layerId => {
      if (map.getLayer(layerId)) { // Ensure layer exists
        map.on('click', layerId, (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties;
          const { nama = 'Unnamed', jenis = 'Unknown' } = properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup({
            className: 'dark-popup',
            closeButton: true,
            closeOnClick: true,
          })
            .setLngLat(coordinates)
            .setHTML(`
              <div class="text-white">
                <strong class="text-blue-400">${nama}</strong>
                <br><span class="text-sm text-gray-300">Type: ${jenis}</span>
              </div>
            `)
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
        pointLayers.forEach(layerId => {
          map.off('click', layerId);
          map.off('mouseenter', layerId);
          map.off('mouseleave', layerId);
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
            } else if (newVisibility) {
              loadGeoJSONData(layerConfig.source)
                .then(data => {
                  if (!map.getSource(layerConfig.sourceId)) {
                    addSourceToMap(map, layerConfig.sourceId, data);
                  } else {
                    map.getSource(layerConfig.sourceId).setData(data);
                  }
                  if (!map.getLayer(layerConfig.id)) {
                    addLayerToMap(map, layerConfig);
                  }
                  map.setLayoutProperty(layerConfig.id, 'visibility', 'visible');
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
  }, [loadGeoJSONData, addSourceToMap, addLayerToMap]);

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

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40" style={{ top: `${HEADER_HEIGHT_PX}px` }}>
      {/* Main Map Container: Always full width and height within its parent */}
      <div ref={mapContainerRef} className="w-full h-full absolute top-0 left-0" />

      {/* Layer Control Sidebar: Absolute positioned, slides in/out */}
      <div
        className={`absolute top-0 h-full transition-all duration-300 ease-in-out z-50 overflow-hidden bg-gray-800 bg-opacity-95`}
        style={{ width: isSidebarOpen ? '25%' : '0', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {isSidebarOpen && <LayerControl layers={layers} onToggle={handleLayerToggle} />}
      </div>

      {/* Sidebar Toggle Button: Positioned relative to the main map, but adjusts with sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200"
        title={isSidebarOpen ? 'Hide Layer Control' : 'Show Layer Control'}
        style={{ left: isSidebarOpen ? 'calc(25% + 1rem)' : '1rem' }} // Adjust position based on sidebar state
      >
        {isSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> {/* Left arrow */}
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> {/* Right arrow */}
          </svg>
        )}
      </button>

      {/* Day/Night Mode Toggle Button */}
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

      {/* Map Inset: Always visible at bottom-right, distinct */}
      <div
        ref={mapInsetRef}
        className="absolute bottom-4 right-4 w-48 h-36 border-2 border-blue-500 rounded-lg overflow-hidden shadow-xl z-50 bg-gray-900"
        style={{ pointerEvents: 'none' }} // Prevent interaction with inset map
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