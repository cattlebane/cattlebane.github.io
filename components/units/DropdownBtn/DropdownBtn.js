import { useRef } from 'react';

const DropdownBtn = (props) => {
  const toolTipRef = useRef(null);

  const copyMouseOutHandler = (e) => {
    // const tooltip = e.currentTarget.children[0];
    // tooltip.innerHTML = 'Copy to clipboard';
    toolTipRef.current.innerHTML = 'Copy to clipboard';
  };

  const handleGetBuildCmdClick = (e) => {
    props.onGetBuildCmdClick(e, toolTipRef.current);
  };

  const handleGetDevCmdClick = (e) => {
    props.onGetDevCmdClick(e, toolTipRef.current);
  };

  return (
    <div className="tooltip">
      <span ref={toolTipRef} className="tooltiptext" id="myTooltip">
        Copy to clipboard
      </span>
      {/* <a className="btn-dropdown" onMouseOut={copyMouseOutHandler}> */}
      <a className="btn btn-grey" onMouseOut={copyMouseOutHandler}>
        CMDs&nbsp;<span className="icon-text">&#xf303;</span>
      </a>
      <div>
        <div className="dropdown-content">
          <a
            className="dropdown-content-select"
            onClick={handleGetBuildCmdClick}
            onMouseOut={copyMouseOutHandler}
          >
            {/* Build&nbsp;cmd */}
            Build
          </a>
          <a
            className="dropdown-content-select"
            onClick={handleGetDevCmdClick}
            onMouseOut={copyMouseOutHandler}
          >
            {/* Dev&nbsp;cmd */}
            Dev
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropdownBtn;
