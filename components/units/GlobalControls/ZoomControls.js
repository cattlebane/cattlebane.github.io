import { Slider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import GlobalControlsContext from '../../../store/globalcontrols-context';

const ZoomControls = (props) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const globalControlsCtx = useContext(GlobalControlsContext);

  useEffect(() => {
    if (globalControlsCtx.zoomLevel === zoomLevel) {
      return;
    }
    setZoomLevel(globalControlsCtx.zoomLevel);
  }, [globalControlsCtx.zoomLevel]);

  const handleIncreaseZoomLevel = () => {
    if (zoomLevel >= 100) {
      return;
    }
    globalControlsCtx.setZoomLevel(zoomLevel + 1);
  };

  const handleDecreaseZoomLevel = () => {
    if (zoomLevel <= 1) {
      return;
    }
    globalControlsCtx.setZoomLevel(zoomLevel - 1);
  };

  const handleSliderChange = (e) => {
    const { value } = e.target;
    if (value === zoomLevel) {
      return;
    }

    globalControlsCtx.setZoomLevel(value);
  };

  return (
    <div className="zoom-controls">
      {/* <div className="zoom-controls btn-global-controls btn-global-controls-white"> */}
      <Stack
        className="zoom-controls-stack"
        spacing={1}
        direction="row"
        sx={{ mb: 1 }}
        alignItems="center"
      >
        <button
          className="btn-controls btn-controls-white"
          onClick={handleDecreaseZoomLevel}
        >
          -
        </button>
        <Slider
          //   className={['zoom-controls-slider']}
          className="zoom-controls-slider"
          size="small"
          defaultValue={100}
          value={zoomLevel}
          //   color={{ palette: { primary: '#ffffff', secondary: 'blue' } }}
          color="primary"
          //   step={10}
          //   marks
          min={10}
          max={100}
          sx={{
            color: 'white',
            '& .MuiSlider-thumb:hover': { color: '#0071e3' },
          }}
          onChange={handleSliderChange}
        />
        <button
          className="btn-controls btn-controls-white"
          onClick={handleIncreaseZoomLevel}
        >
          +
        </button>
      </Stack>
      <div className="zoom-controls-number">{`${zoomLevel}%`}</div>
    </div>
  );
};

export default ZoomControls;
