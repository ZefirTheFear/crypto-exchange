import React, { useState } from "react";

import Header from "./components/Header/Header";
import Context from "./context";

import "./App.scss";
import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Exchange from "./components/Exchange/Exchange";
import AboutUs from "./components/AboutUs/AboutUs";
import Contacts from "./components/Contacts/Contacts";
import MenuMobile from "./components/MenuMobile/MenuMobile";

function App() {
  const [isShownMenu, setIsShownMenu] = useState(false);

  const scrollTo = node => {
    node.scrollIntoView({ behavior: "smooth" });
  };

  const closeMenu = () => {
    document.querySelector(".menu__btn").classList.remove("menu__btn_close");
    document.querySelector(".menu-mobile").classList.remove("menu-mobile_opened");
    setIsShownMenu(false);
  };

  return (
    <Context.Provider value={{ scrollTo, isShownMenu, setIsShownMenu, closeMenu }}>
      <Header />
      <MenuMobile />
      <Hero />
      <Calculator />
      <Exchange />
      <AboutUs />
      <Contacts />
    </Context.Provider>
  );
}

export default App;
