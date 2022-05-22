import { createContext } from "react";

const GlobalNavContext = createContext({
  currentSection: "",
  updateSection: () => {},
});

export default GlobalNavContext;
