import React from "react";

import Header from "../../components/Header/Header";
import MenuMobile from "../../components/MenuMobile/MenuMobile";
import Hero from "../../components/Hero/Hero";
import Calculator from "../../components/Calculator/Calculator";
import Exchange from "../../components/Exchange/Exchange";
import AboutUs from "../../components/AboutUs/AboutUs";
import Contacts from "../../components/Contacts/Contacts";

const Home = () => {
  return (
    <>
      <Header />
      <MenuMobile />
      <Hero />
      <Calculator />
      <Exchange />
      <AboutUs />
      <Contacts />
    </>
  );
};

export default Home;