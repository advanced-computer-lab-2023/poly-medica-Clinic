import  { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const initialFilterData = [
    {
      attribute: '',
      values: [],
      selectedValue: '',
    }
  ];
  const location = useLocation();
  const [filterData, setFilterData] = useState(initialFilterData);

  const updateFilter = (newFilterData) => {
    setFilterData(newFilterData);
  };

  useEffect(() => {
    return () => {
      setFilterData(initialFilterData);
    };
  }, [location.pathname]);

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
