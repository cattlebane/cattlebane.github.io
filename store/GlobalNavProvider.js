import { useState } from "react";
import GlobalNavContext from "./globalnav-context";

const GlobalNavProvider = (props) => {
  const [currentSection, setCurrentSection] = useState(null);

  const updateSection = (newSection) => {
    setCurrentSection(newSection);
  };

  return (
    <GlobalNavContext.Provider
      value={{
        currentSection: currentSection,
        updateSection: updateSection,
      }}
    >
      {props.children}
    </GlobalNavContext.Provider>
  );
};

export default GlobalNavProvider;
