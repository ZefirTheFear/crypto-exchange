import React from "react";

import Header from "./components/Header/Header";
import Context from "./context";

import "./App.scss";
import Hero from "./components/Hero/Hero";
import Calculator from "./components/Calculator/Calculator";
import Exchange from "./components/Exchange/Exchange";
import AboutUs from "./components/AboutUs/AboutUs";
import Contacts from "./components/Contacts/Contacts";

function App() {
  return (
    <Context.Provider value={{}}>
      <Header />
      <Hero />
      <Calculator />
      <Exchange />
      <AboutUs />
      <Contacts />
    </Context.Provider>
  );
}

export default App;
