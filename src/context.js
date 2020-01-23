import React from "react";

export default React.createContext({
  scrollTo: () => {},
  isShownMenu: null,
  setIsShownMenu: () => {},
  closeMenu: () => {},
  BTC: null,
  setBTC: () => {},
  ETH: null,
  setETH: () => {},
  UAHSAle: null,
  setUAHSale: () => {},
  UAHBuy: null,
  setUAHBuy: () => {}
});
