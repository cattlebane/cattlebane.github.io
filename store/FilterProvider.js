import { useState } from 'react';
import FilterContext from './filter-context';

/* const isNumeric = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

const isDimensions = (str) => {
  const dimentions = str.toLowercase().split('x');
  if (dimentions.length !== 2) return false;
  return isNumeric(dimentions[0]) && isNumeric(dimentions[1]);
}; */

const FilterProvider = (props) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [inactiveFilters, setInactiveFilters] = useState([]);
  // const [activeSizes, setActiveSizes] = useState([]);
  // const [activeKeywords, setActiveKeywords] = useState([]);

  /* const add = (id) => {
    if (isDimensions(id)) {
      setActiveSizes((sizes) => {
        const updatedSizes = [...sizes];
        updatedSizes.push(id);
        return updatedSizes;
      });
    } else {
      setActiveKeywords((keywords) => {
        const updatedKeywords = [...keywords];
        updatedKeywords.push(id);
        return updatedKeywords;
      });
    }
  }; */

  const add = (id) => {
    removeInactive(id);
    setActiveFilters((filters) => {
      const updatedFilters = [...filters];
      updatedFilters.push(id);
      return updatedFilters;
    });
  };

  const remove = (id) => {
    setActiveFilters((filters) => {
      const updatedActiveFilters = filters.filter(
        (filterID) => filterID !== id
      );
      return [...updatedActiveFilters];
    });
  };

  const addInactive = (id) => {
    remove(id); // ** first remove it from activeFilters if it's there
    setInactiveFilters((filters) => {
      const updatedInactiveFilters = [...filters];
      updatedInactiveFilters.push(id);
      return updatedInactiveFilters;
    });
  };

  const removeInactive = (id) => {
    setInactiveFilters((filters) => {
      const updatedInactiveFilters = filters.filter(
        (filterID) => filterID !== id
      );
      return [...updatedInactiveFilters];
    });
  };

  const clear = () => {
    setActiveFilters([]);
    setInactiveFilters([]);
  };

  const updateActiveFilters = (updatedFilters) => {
    setActiveFilters(updatedFilters);
  };

  const updateInactiveFilters = (updatedFilters) => {
    setInactiveFilters(updatedFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        activeFilters: activeFilters,
        inactiveFilters: inactiveFilters,
        updateActiveFilters: updateActiveFilters,
        updateInactiveFilters: updateInactiveFilters,
        add: add,
        remove: remove,
        addInactive: addInactive,
        removeInactive: removeInactive,
        clear: clear,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
