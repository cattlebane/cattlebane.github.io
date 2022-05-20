import { useState } from 'react';
import GlobalControlsContext from './globalcontrols-context';

const GlobalControlsProvider = (props) => {
  const [builds, setBuilds] = useState([]);
  const [toBuild, setToBuild] = useState([]);
  const [toClose, setToClose] = useState([]);
  const [toPreview, setToPreview] = useState([]);
  const [toRefresh, setToRefresh] = useState([]);
  const [selected, setSelected] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const build = () => {
    setToBuild([...selected]);
  };

  const close = (previewToClose) => {
    if (previewToClose) {
      setToPreview((toPreview) => {
        const updatedToPreview = toPreview.filter(
          (preview) => preview !== previewToClose
        );
        return [...updatedToPreview];
      });
      /* setToRefresh((toRefresh) => {
        const updatedToRefresh = toRefresh.filter(
          (preview) => preview !== previewToClose
        );
        return [...updatedToRefresh];
      }); */
      setToRefresh([]);
      setToClose([previewToClose]);
    } else {
      setToPreview([]);
      setToRefresh([]);
      setToClose([...selected]);
    }
  };

  const refresh = () => {
    setToRefresh([...selected]);
  };

  const preview = (id) => {
    if (id) {
      setToPreview((toPreview) => {
        const updatedPreviews = [...toPreview];
        if (updatedPreviews.indexOf(id) < 0) updatedPreviews.push(id);
        return [...updatedPreviews];
      });
    } else {
      setToPreview([...selected]);
    }
  };

  const select = (id) => {
    setSelected((selected) => {
      // ** begin by removing id from selected array (deselect)
      const updatedSelected = selected.filter(
        (selectedID) => selectedID !== id
      );
      // ** if it was actually removed...return this new array
      if (updatedSelected.length === selected.length) {
        // ** if it wasn't in the array, then push it (select)
        updatedSelected.push(id);
      }
      return updatedSelected;
    });
  };

  const deselect = (id) => {
    setSelected((selected) => {
      const updatedSelected = selected.filter(
        (selectedID) => selectedID !== id
      );
      return updatedSelected.length === selected.length
        ? selected
        : updatedSelected;
    });
  };

  const selectAll = () => {
    const selections = [];
    builds.forEach((build) => {
      // const buildUnit = document.getElementById(build.id);
      // const buildUnit = document.querySelector(`${build.id}`);
      // if (document.querySelector(`#${build.id}`).style.display === 'block') {
      if (document.getElementById(build.id).style.display === 'block') {
        selections.push(build.id);
      }
    });
    setSelected(selections);
  };

  const deselectAll = () => {
    if (selected.length > 0) {
      setSelected([]);
    }
  };

  const updateBuilds = (newBuilds) => {
    setBuilds([...newBuilds]);
  };

  const handleSetZoomLevel = (newZoomLevel = 100) => {
    if (newZoomLevel === zoomLevel) {
      return;
    }
    setZoomLevel(newZoomLevel);
  };

  return (
    <GlobalControlsContext.Provider
      value={{
        builds: builds,
        toBuild: toBuild,
        toClose: toClose,
        toPreview: toPreview,
        toRefresh: toRefresh,
        selected: selected,
        zoomLevel: zoomLevel,
        setZoomLevel: handleSetZoomLevel,
        build: build,
        close: close,
        deselect: deselect,
        deselectAll: deselectAll,
        preview: preview,
        refresh: refresh,
        select: select,
        selectAll: selectAll,
        updateBuilds: updateBuilds,
      }}
    >
      {props.children}
    </GlobalControlsContext.Provider>
  );
};

export default GlobalControlsProvider;
