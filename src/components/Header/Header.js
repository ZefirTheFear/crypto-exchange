import React from "react";

import { AiOutlineMenuFold } from "react-icons/ai";

import logoMark from "../../assets/img/bittrex-logo-mark.svg";
import wordMark from "../../assets/img/bittrex-word-mark-global.svg";

import "./Header.scss";

const Header = () => {
  const scrollTo = node => {
    node.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img src={logoMark} alt="logo" className="header__logo-img-mark" />
          <img src={wordMark} alt="logo" className="header__logo-word-mark" />
        </div>
        <nav className="header__menu">
          <div
            className="header__menu-item"
            onClick={() => {
              scrollTo(document.querySelector(".calculator"));
            }}
          >
            калькулятор
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              scrollTo(document.querySelector(".exchange"));
            }}
          >
            обмен
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              scrollTo(document.querySelector(".about-us"));
            }}
          >
            о нас
          </div>
          <div
            className="header__menu-item"
            onClick={() => {
              scrollTo(document.querySelector(".contacts"));
            }}
          >
            контакты
          </div>
        </nav>
        <div className="header__menu-mobile-toggler">
          <AiOutlineMenuFold />
        </div>
      </div>
    </header>
  );
};

export default Header;
