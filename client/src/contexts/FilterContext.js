// FilterContext.js

import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(
    [
      {
        attribute: '', // The attribute to filter on (e.g., 'medicinalUse')
        values: [], // The available values to filter by
        selectedValue: '', // The currently selected filter value
      }
    ]);

  const updateFilter = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <FilterContext.Provider value={{ filterData, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
