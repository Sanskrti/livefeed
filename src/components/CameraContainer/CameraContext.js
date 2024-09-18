import React, { useState, createContext } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  return (
    <CameraContext.Provider value={{ selectedCamera, setSelectedCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraContext;
