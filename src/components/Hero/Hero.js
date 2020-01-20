import React from "react";

import logo from "../../assets/img/logo_cop.svg";
import logoWords from "../../assets/img/new-words-logo.svg";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <p className="hero__text">вместе к успеху</p>
        <div className="hero-logo">
          <img src={logo} alt="logo" className="hero__logo-img" />
          <img src={logoWords} alt="logo" className="hero__logo-words" />
        </div>
        <p className="hero__text">обмен криптовалюты</p>
      </div>
    </section>
  );
};

export default Hero;
