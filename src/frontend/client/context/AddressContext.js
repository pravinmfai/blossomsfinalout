import React, { createContext, useState, useContext } from 'react';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addressState, setAddressState] = useState(null);

  const saveAddress = (address) => {
    setAddressState(address);
  };

  return (
    <AddressContext.Provider value={{ addressState, saveAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
