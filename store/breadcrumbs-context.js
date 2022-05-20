import { createContext } from 'react';

const BreadcrumbsContext = createContext({
  breadcrumbs: [],
  updateBreadcrumbs: () => {},
});

export default BreadcrumbsContext;
