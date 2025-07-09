import React from 'react';

const LayerControl = ({ layers, onToggle }) => {
  const landUseColors = {
    'Sungai': '#4a90e2', // Water blue, consistent with river if it's a fill layer
    'Tempat Tinggal': '#e57373', // Softer red for residential
    'Sawah': '#81c784', // Fresh green for rice fields
    'Kebun Campur': '#aed581', // Lighter green for mixed garden
    'Rumput': '#c5e1a5', // Pale green for grass
    'Tegalan/Ladang': '#d4a373', // Earthy brown for dry land/fields
    'Lahan Terbuka (Tanah Kosong)': '#b0bec5', // Light grey-blue for open land
    'Hutan': '#388e3c', // Darker green for forest
    'Peternakan': '#ffb74d', // Orange for animal husbandry
    'Perkebunan': '#558b2f', // Olive green for plantations
    'Perdagangan dan Jasa': '#ff8a65', // Peach for commercial/services
    'Pendidikan': '#7986cb', // Muted purple-blue for education
    'Peribadatan': '#9575cd', // Deeper purple for worship
    'Telekomunikasi': '#64b5f6', // Sky blue for telecommunications
    'Perikanan air tawar': '#4fc3f7', // Lighter blue for freshwater fisheries
    'Pekarangan': '#a5d6a7', // Light mint green for yards
    'Pemakaman': '#757575', // Dark grey for cemeteries
    'Semak Belukar': '#7cb342', // Green-yellow for bushes
    'Industri dan Perdagangan': '#a1887f', // Brown-grey for industry/commerce
    'Vegetasi Non Budidaya Lainnya': '#66bb6a', // Medium green for other non-cultivated vegetation
  };

  const roadColors = {
    'Jalan Lain': { color: '#ff6f00', width: '2px' }, // Orange, medium width
    'Jalan Lokal': { color: '#bf360c', width: '3px' }, // Darker red, wider
    'Jalan Setapak': { color: '#8d6e63', width: '1px' }, // Brown, thin
    'Lokal': { color: '#d32f2f', width: '3px' }, // Red, wider
    'Pematang': { color: '#a1887f', width: '1px' }, // Muted brown, thin
  };

  const facilityColors = {
    'Telekomunikasi': '#64b5f6',
    'Peribadatan': '#9575cd',
    'Pendidikan': '#7986cb',
    'Pemakaman': '#757575',
    'Industri': '#a1887f',
  };

  return (
    <div className="p-4 rounded-lg shadow-lg text-white h-full overflow-y-auto flex flex-col bg-gray-800 bg-opacity-95 border-r border-gray-700">
      <h3 className="font-semibold text-lg mb-3 border-b border-gray-600 pb-2">Layer Peta dan Legenda</h3>
      <div className="space-y-4 flex-grow">
        {layers.map(group => (
          <div key={group.id} className="bg-gray-700 p-3 rounded-md shadow-sm">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => onToggle(group.id)}>
              <label htmlFor={group.id} className="text-base text-gray-200 select-none mr-3 font-medium">
                {group.name}
              </label>
              <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id={group.id}
                  checked={group.visible}
                  onChange={() => onToggle(group.id)}
                  className="hidden"
                />
                <div
                  className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${group.visible ? 'bg-blue-600' : 'bg-gray-600'}`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${group.visible ? 'translate-x-6' : ''}`}
                ></div>
              </div>
            </div>

            {group.visible && (
              <div className="ml-2 mt-3 text-sm text-gray-300">
                <h4 className="font-medium mb-2 text-gray-200">Legenda:</h4>
                {group.id === 'penggunaan-lahan-group' && Object.entries(landUseColors).map(([key, color]) => (
                  <div key={key} className="flex items-center space-x-3 mb-1">
                    <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
                    <span>{key}</span>
                  </div>
                ))}
                {group.id === 'transportasi-group' && Object.entries(roadColors).map(([key, { color, width }]) => (
                  <div key={key} className="flex items-center space-x-3 mb-1">
                    <div className="w-5" style={{ backgroundColor: color, height: width, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
                    <span>{key}</span>
                  </div>
                ))}
                {group.id === 'sarana-prasarana-group' && Object.entries(facilityColors).map(([key, color]) => (
                  <div key={key} className="flex items-center space-x-3 mb-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: color, border: '2px solid #ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    </div>
                    <span>{key}</span>
                  </div>
                ))}
                {group.id === 'perairan-group' && (
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: '#4a90e2', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
                    <span>Sungai</span>
                  </div>
                )}
                {group.id === 'batas-admin-group' && (
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: '#ccc', border: '1px dashed #63C8FF', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
                    <span>Batas Administrasi</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;