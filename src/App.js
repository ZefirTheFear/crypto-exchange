import React, { useState } from "react";

import smoothscroll from "smoothscroll-polyfill";

import Header from "./components/Header/Header";
import Context from "./context";

import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Exchange from "./components/Exchange/Exchange";
import AboutUs from "./components/AboutUs/AboutUs";
import Contacts from "./components/Contacts/Contacts";
import MenuMobile from "./components/MenuMobile/MenuMobile";
import Modal from "./components/Modal/Modal";

import "./App.scss";

smoothscroll.polyfill();

function App() {
  const [isShownMenu, setIsShownMenu] = useState(false);
  const [isError, setIsError] = useState(false);

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
    closeMenu();
  };

  return (
    <Context.Provider value={{ scrollTo, isShownMenu, setIsShownMenu, closeMenu, setIsError }}>
      {isError ? (
        <Modal closeModal={closeModal} text="что-то пошло не так. попробуйте еще раз" />
      ) : null}
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
