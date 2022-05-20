import { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import Profiles from '../Profiles/Profiles';
import Filter from './Filter/Filter';
import FilterCmd from './FilterCmd/FilterCmd';
import FilterContext from '../../../../store/filter-context';

const Filters = (props) => {
  const { builds } = props;
  const [theFilters, setTheFilters] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const ulRef = useRef(null);
  const toggleRef = useRef(null);
  // const contanerRef = useRef(null);
  const filterCtx = useContext(FilterContext);

  useEffect(() => {
    if (!builds) {
      return false;
    }

    const ids = builds.map((build) => build.id);

    const clear = () => {
      filterCtx.clear();
    };

    const filtersData = [];
    ids.forEach((id) => {
      // ** regex to split the folder name into filterable pieces
      const idData = id.split(/_|-| /);
      // ** push id's that don't currently exist into the array
      idData.forEach((filterID) => {
        if (filtersData.indexOf(filterID) < 0) {
          // ** only add if the id isn't included in every entry's ID
          // ** for instance, if each id has _props_ in it, it'll exclude it from the filter list
          const filteredIDs = ids.filter(
            (filteringID) => filteringID.indexOf(filterID) > -1
          );
          if (filteredIDs.length !== ids.length) {
            filtersData.push(filterID);
          }
        }
      });
    });

    filtersData.sort();

    const newFilters = filtersData.map((id) => (
      <Filter key={`filter_${id}`} id={id} />
    ));
    // ** add the clear button at the end
    newFilters.push(
      <FilterCmd key="filter_clear" id="clear" onClick={clear} />
    );
    setTheFilters(newFilters);
  }, [builds, filterCtx.clear]);

  useEffect(() => {
    const widthTimeout = null;
    gsap.set(ulRef.current, { opacity: 0 });
    const checkWidth = (widthTimeout) => {
      console.log('Filters.checkWidth()');
      clearTimeout(widthTimeout);
      // if (ulRef.current.offsetWidth > 0 && theFilters) {
      if (ulRef.current.offsetWidth > 0) {
        widthTimeout = setTimeout(() => {
          const destX = -ulRef.current.offsetWidth;
          gsap.set('.filter-btn', { x: destX });
          gsap.set(ulRef.current, { opacity: 1 });
          handleFiltersToggle();
          // if (theFilters.length > 1) handleFiltersToggle();
        }, 1 * 250);
      } else {
        widthTimeout = setTimeout(() => {
          checkWidth(widthTimeout);
        }, 500);
      }
    };
    checkWidth(widthTimeout);
  }, [ulRef]);

  const handleFiltersToggle = () => {
    if (isShowing) {
      const destX = -ulRef.current.offsetWidth;
      gsap.to('.filter-btn', {
        x: destX,
        duration: 0.5,
        ease: 'power2.in',
        stagger: 0.1,
        // onComplete: () => (contanerRef.current.style.position = 'absolute'),
      });
      toggleRef.current.classList.remove('btn-text-dropdown-active');
    } else {
      toggleRef.current.classList.add('btn-text-dropdown-active');
      gsap.to('.filter-btn', {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: -0.1,
        // onStart: () => (contanerRef.current.style.position = 'relative'),
      });
    }
    setIsShowing((isShowing) => {
      return !isShowing;
    });
  };

  return (
    <div
      // ref={contanerRef}
      className="Filters"
    >
      {/* {theFilters.length > 0 && (
        <> */}
      <a
        ref={toggleRef}
        className="btn-text-dropdown"
        onClick={handleFiltersToggle}
      >
        Filters
      </a>
      <ul ref={ulRef}>{theFilters}</ul>
      {/* </>
      )} */}
    </div>
  );
};

export default Filters;
