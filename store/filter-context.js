import { createContext } from 'react';

const FilterContext = createContext({
  activeFilters: [],
  inactiveFilters: [],
  updateActiveFilters: () => {},
  updateInactiveFilters: () => {},
  add: () => {},
  remove: () => {},
  addInactive: () => {},
  removeInactive: () => {},
  clear: () => {},
});

export default FilterContext;
