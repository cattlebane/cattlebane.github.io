import { useState } from 'react';
import BreadcrumbsContext from './breadcrumbs-context';

const BreadcrumbsProvider = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const updateBreadcrumbs = (newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs: breadcrumbs,
        updateBreadcrumbs: updateBreadcrumbs,
      }}
    >
      {props.children}
    </BreadcrumbsContext.Provider>
  );
};

export default BreadcrumbsProvider;
