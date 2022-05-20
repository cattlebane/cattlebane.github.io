import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import urlExist from 'url-exist';

// import DropdownBtn from '../../DropdownBtn/DropdownBtn';
import Preview from '../../Preview/Preview';
import gsap from 'gsap/gsap-core';

import FilterContext from '../../../../store/filter-context';
import GlobalControlsContext from '../../../../store/globalcontrols-context';

const BuildModule = (props) => {
  const { id, size } = props.build;
  const moduleRef = useRef(null);
  const selectRef = useRef(null);
  const previewBtnRef = useRef(null);
  // const [isShowing, setIsShowing] = useState(true);
  const [previewReady, setPreviewReady] = useState(false);
  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState('');
  const filterCtx = useContext(FilterContext);
  const globalControlsCtx = useContext(GlobalControlsContext);
  // const selectOutChar = '&#9744;';
  const selectOutChar = '&nbsp;';
  const selectOverChar = '&#9745;';
  const selectActiveChar = '&#9746;';
  // const width = size.split('x')[0];
  // const height = size.split('x')[1];
  // const previewShapeSize = 50;
  // const ratio = width / height;
  // const shapeWidth = ratio > 1 ? previewShapeSize : ratio * previewShapeSize;
  // const shapeHeight =
  //   ratio < 1 ? previewShapeSize : previewShapeSize * (height / width);

  const handlePreviewClick = () => {
    if (url) {
      handlePreviewCloseClick();
    } else {
      globalControlsCtx.preview(id);
    }
  };

  const handleShowPreview = useCallback(() => {
    console.log('BuildModule handleShowPreview()');
    console.log(' » url:', url);
    console.log(' » id:', id);
    if (url) {
      return false;
    }
    setStatus('loading');
    setUrl(props.build.path);
  }, [props.build, url, id]);

  const handlePreviewCloseClick = () => {
    globalControlsCtx.close(id);
  };

  const handlePreviewClose = useCallback(
    (ignoreStatus) => {
      setPreviewReady(false);
      setUrl(null);
      if (!ignoreStatus) setStatus('');
    },
    [props.build]
  );

  const checkPreviewStatus = useCallback(
    (timesToTry = 8) => {
      console.log('BuildModule checkPreviewStatus()');
      // urlExist(url).then((res) => {
      // console.log('   » urlExist res:', res);
      // console.log('   » timesToTry:', timesToTry);
      // if (res) {
      setStatus('');
      setPreviewReady(true);
      return true;
      // }

      /* if (!res && timesToTry > 0) {
          setStatus((status) => {
            return `${status}.`;
          });

          setTimeout(checkPreviewStatus, 1000, timesToTry - 1);
        } else {
          setStatus('ERROR - Please try again');
          handlePreviewClose(true);
        } */
      // });
    },
    [handlePreviewClose, url]
  );

  const reapear = useCallback(() => {
    if (moduleRef.current.style.display !== 'block') {
      gsap.to(moduleRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onStart: () => (moduleRef.current.style.display = 'block'),
      });
      //** automatically set it as selected when reapearing */
      if (globalControlsCtx.selected.indexOf(id) < 0) {
        selectClickHandler();
      }
    }
  }, [moduleRef, id, globalControlsCtx.selected]);

  const selectClickHandler = () => {
    globalControlsCtx.select(id);
  };

  /* const selectMouseOverHandler = () => {
    selectRef.current.innerHTML =
      globalControlsCtx.selected.indexOf(id) > -1
        ? selectActiveChar
        : selectOverChar;
  };
  const selectMouseOutHandler = () => {
    selectRef.current.innerHTML =
      globalControlsCtx.selected.indexOf(id) > -1
        ? selectActiveChar
        : selectOutChar;
  };

  useEffect(() => {
    selectRef.current.innerHTML =
      globalControlsCtx.selected.indexOf(id) > -1
        ? selectActiveChar
        : selectOutChar;
  }, [globalControlsCtx.selected]); */

  useEffect(() => {
    // console.log('BuildModule useEffect url');
    // console.log(' » id:', id);
    // console.log(' » url:', url);
    if (url) checkPreviewStatus();
  }, [url, id, checkPreviewStatus]);

  useEffect(() => {
    if (
      filterCtx.activeFilters.length === 0 &&
      filterCtx.inactiveFilters.length === 0
    ) {
      // moduleRef.current.style.display = 'block';
      reapear();
    } else {
      // ** get the active filters that match this unit's id
      const matchingActiveFilters = filterCtx.activeFilters.filter(
        (activeFilter) => id.indexOf(activeFilter) > -1
      );
      // ** all Matching Active Filters must be present in the ID to show the build
      const matchingAllActiveFilters =
        matchingActiveFilters.length === filterCtx.activeFilters.length;
      const matchingInactiveFilters = filterCtx.inactiveFilters.filter(
        (inactiveFilter) => id.indexOf(inactiveFilter) > -1
      );
      if (
        matchingInactiveFilters.length < 1 &&
        // (matchingActiveFilters.length > 0 ||
        (matchingAllActiveFilters || filterCtx.activeFilters.length === 0)
      ) {
        reapear();
      } else {
        globalControlsCtx.deselect(id);
        gsap.to(moduleRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => (moduleRef.current.style.display = 'none'),
        });
      }
    }
  }, [filterCtx.activeFilters, filterCtx.inactiveFilters, id, reapear]);

  useEffect(() => {
    // console.log(
    //   'BuildModule useEffect handleShowPreview',
    //   globalControlsCtx.toPreview
    // );
    if (globalControlsCtx.toPreview.indexOf(id) > -1) {
      handleShowPreview();
      // ** switch classList to have btn-blue
      previewBtnRef.current.classList.remove('btn-grey');
      previewBtnRef.current.classList.add('btn-blue');
    }
  }, [globalControlsCtx.toPreview, id, handleShowPreview]);

  useEffect(() => {
    // console.log(
    //   'BuildModule useEffect handlePreviewClose',
    //   globalControlsCtx.toClose
    // );
    if (globalControlsCtx.toClose.indexOf(id) > -1) {
      handlePreviewClose();
      // ** switch classList to have btn-grey
      previewBtnRef.current.classList.remove('btn-blue');
      previewBtnRef.current.classList.add('btn-grey');
    }
  }, [globalControlsCtx.toClose, handlePreviewClose, id]);

  return (
    <li
      ref={moduleRef}
      className="Build"
      key={id}
      id={id}
      // style={{
      //   minWidth: `${width}px`,
      //   minHeight: `${height}px`,
      // }}
    >
      <ul>
        <li>
          <div className="unit-nav">
            <ul className="unit-header">
              <li>
                <h2>{size}</h2>
                <h4>{id}</h4>
              </li>
              {/* {!previewReady && (
                // <li style={{ backgroundColor: 'pink' }}>
                <li>
                  <div
                    className="shape-preview"
                    style={{
                      width: `${shapeWidth}px`,
                      height: `${shapeHeight}px`,
                    }}
                  ></div>
                </li>
              )} */}
            </ul>
          </div>
        </li>
        <li>
          <div className="unit-nav">
            <ul>
              <li>
                {/* <a className="btn btn-blue" onClick={handlePreviewClick}> */}
                <a
                  ref={previewBtnRef}
                  className="btn btn-grey"
                  onClick={handlePreviewClick}
                >
                  Preview
                </a>
              </li>
            </ul>
          </div>
        </li>
        {url && (
          <>
            {previewReady ? (
              <Preview
                id={id}
                size={size.split('x')}
                url={url}
                type={props.build.type}
                onPreviewClose={handlePreviewCloseClick}
              />
            ) : (
              <li>{status && <h3>{status}</h3>}</li>
            )}
          </>
        )}
      </ul>

      {/* <a
        ref={selectRef}
        className="unit-select btn-icon-global-controls btn-icon-global-controls-grey"
        onClick={selectClickHandler}
        onMouseOver={selectMouseOverHandler}
        onMouseOut={selectMouseOutHandler}
      >
        {selectOutChar}
      </a> */}
    </li>
  );
};

export default BuildModule;
