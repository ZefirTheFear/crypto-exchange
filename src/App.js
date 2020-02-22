import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import smoothscroll from "smoothscroll-polyfill";

import Context from "./context";

import Modal from "./components/Modal/Modal";

import Home from "./pages/Home/Home";
import Article from "./pages/Article/Article";
import NotFound from "./pages/NotFound/NotFound";

import "./App.scss";

smoothscroll.polyfill();
function App() {
  const [isShownMenu, setIsShownMenu] = useState(false);
  const [isError, setIsError] = useState(false);

  const [BTC, setBTC] = useState(null);
  const [ETH, setETH] = useState(null);
  const [UAHSale, setUAHSale] = useState(null);
  const [UAHBuy, setUAHBuy] = useState(null);

  const scrollTo = node => {
    const headerOffset = 60;
    window.scrollTo({
      top: window.pageYOffset + node.getBoundingClientRect().top - headerOffset,
      behavior: "smooth"
    });
  };

  const closeMenu = () => {
    document.querySelector(".menu__btn").classList.remove("menu__btn_close");
    document.querySelector(".menu-mobile").classList.remove("menu-mobile_opened");
    setIsShownMenu(false);
  };

  const closeModal = () => {
    setIsError(false);
  };

  window.onresize = () => {
    if (isShownMenu) {
      closeMenu();
    }
  };

  return (
    <Context.Provider
      value={{
        scrollTo,
        isShownMenu,
        setIsShownMenu,
        closeMenu,
        setIsError,
        BTC,
        setBTC,
        ETH,
        setETH,
        UAHSale,
        setUAHSale,
        UAHBuy,
        setUAHBuy
      }}
    >
      <BrowserRouter>
        {isError ? (
          <Modal closeModal={closeModal} text="что-то пошло не так. попробуйте еще раз" />
        ) : null}
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="/index.html" to="/" />
          <Redirect from="/index.php" to="/" />
          <Route exact path="/obmen-kriptovalyut" component={Article} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
