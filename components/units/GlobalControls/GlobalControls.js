import { useContext, useEffect, useRef } from 'react';
import GlobalControlsContext from '../../../store/globalcontrols-context';
import ZoomControls from './ZoomControls';

const GlobalControls = (props) => {
  const globalControlsCtx = useContext(GlobalControlsContext);
  const selectRef = useRef(null);

  const selectAllHandler = () => {
    if (globalControlsCtx.selected.length > 0) {
      globalControlsCtx.deselectAll();
    } else {
      globalControlsCtx.selectAll();
    }
  };

  /* useEffect(() => {
    selectRef.current.innerHTML =
      globalControlsCtx.selected.length > 0 ? '&#9746;' : '&#9745;';
  }, [globalControlsCtx.selected]); */

  return (
    <div className="global-controls">
      <ul>
        {/* <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Select ALL
            </span>
            <a
              ref={selectRef}
              className="btn-global-controls btn-global-controls-icon btn-global-controls-white"
              onClick={selectAllHandler}
            >
              &#9746;
            </a>
          </div>
        </li> */}
        <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Zoom Level
            </span>
            <ZoomControls />
          </div>
        </li>
        <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Preview
            </span>
            <a
              className="btn-global-controls btn-global-controls-icon btn-global-controls-white"
              onClick={() => globalControlsCtx.preview()}
            >
              &#128066;
              {/* &#128065; */}
            </a>
          </div>
        </li>
        <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Close
            </span>
            <a
              className="btn-global-controls btn-global-controls-icon btn-global-controls-white"
              onClick={() => globalControlsCtx.close()}
            >
              
            </a>
          </div>
        </li>
        <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Refresh
            </span>
            <a
              className="btn-global-controls btn-global-controls-icon btn-global-controls-white"
              onClick={globalControlsCtx.refresh}
            >
              
            </a>
          </div>
        </li>
        {/* <li>
          <div className="tooltip">
            <span className="tooltiptext" id="myTooltip">
              Build
            </span>
            <a
              className="btn-global-controls btn-global-controls-icon btn-global-controls-white"
              onClick={globalControlsCtx.build}
            >
              &#128297;
            </a>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default GlobalControls;
