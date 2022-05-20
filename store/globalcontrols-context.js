import { createContext } from 'react';

const GlobalControlsContext = createContext({
  builds: [],
  toBuild: [],
  toClose: [],
  toPreview: [],
  toRefresh: [],
  selected: [],
  zoomLevel: 100,
  setZoomLevel: () => {},
  build: () => {},
  close: () => {},
  preview: () => {},
  refresh: () => {},
  select: () => {},
  selectAll: () => {},
  deselect: () => {},
  deselectAll: () => {},
  updateBuilds: () => {},
});

export default GlobalControlsContext;
