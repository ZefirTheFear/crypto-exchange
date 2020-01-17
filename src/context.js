import React from "react";

export default React.createContext({
  scrollTo: () => {},
  isShownMenu: null,
  setIsShownMenu: () => {},
  closeMenu: () => {}
});
