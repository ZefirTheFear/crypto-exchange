import React from "react";

import logo from "../../assets/img/bittrex-logo-global-lg.svg";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <img src={logo} alt="logo" />
        <p className="hero__text">обмен криптовалюты</p>
      </div>
    </section>
  );
};

export default Hero;
