import { useContext, useEffect, useRef, useState } from 'react';
import FilterContext from '../../../../../store/filter-context';

const Filter = (props) => {
  const { id } = props;
  const btnRef = useRef(null);
  const filterCtx = useContext(FilterContext);
  const [isActive, setIsActive] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const handleFilterClick = (e) => {
    if (e.metaKey) {
      const inactive = !isInactive;
      if (inactive) {
        filterCtx.addInactive(id);
      } else {
        filterCtx.removeInactive(id);
      }
    } else {
      const active = !isActive;
      if (active) {
        filterCtx.add(id);
      } else {
        filterCtx.remove(id);
      }
    }
  };

  useEffect(() => {
    const active = filterCtx.activeFilters.indexOf(id) > -1;
    setIsActive(active);
    const inactive = filterCtx.inactiveFilters.indexOf(id) > -1;
    setIsInactive(inactive);
    if (btnRef.current) {
      if (active) {
        btnRef.current.classList.remove('btn-grey');
        btnRef.current.classList.remove('btn-dark');
        btnRef.current.classList.add('btn-blue');
      } else if (inactive) {
        btnRef.current.classList.remove('btn-grey');
        btnRef.current.classList.remove('btn-blue');
        btnRef.current.classList.add('btn-dark');
      } else {
        btnRef.current.classList.remove('btn-blue');
        btnRef.current.classList.remove('btn-dark');
        btnRef.current.classList.add('btn-grey');
      }
    }
  }, [filterCtx.activeFilters, filterCtx.inactiveFilters, id]);

  return (
    <li className="filter-btn" id={id}>
      <a ref={btnRef} className="btn-sm btn-grey" onClick={handleFilterClick}>
        {id}
      </a>
    </li>
  );
};

export default Filter;
