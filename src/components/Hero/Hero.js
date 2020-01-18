import React from "react";

import logo from "../../assets/img/logo-big.svg";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <p className="hero__text">вместе к успеху</p>
        <img src={logo} alt="logo" />
        <p className="hero__text">обмен криптовалюты</p>
      </div>
    </section>
  );
};

export default Hero;
