import React, { useState, useContext } from "react";

import Context from "../../context";

import "./Exchange.scss";

const Exchange = () => {
  const context = useContext(Context);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameOnChange = e => {
    setName(e.target.value);
  };

  const numberOnChange = e => {
    setNumber(e.target.value);
  };

  const sendData = e => {
    e.preventDefault();
    console.log("name - " + name);
    console.log("number - " + number);
  };

  const openSuccessModal = () => {
    console.log("modal in progress");
  };

  return (
    <section className="exchange">
      <div className="exchange__inner">
        <div className="exchange__desc">
          для обмена криптовалюты свяжитесь с нами по данным из{" "}
          <span
            className="exchange__contact-link"
            onClick={() => {
              context.scrollTo(document.querySelector(".contacts"));
            }}
          >
            контактов
          </span>{" "}
          или оставьте свои и мы вам перезвоним
        </div>
        <form className="exchange__form" onSubmit={sendData}>
          <div>
            <input
              type="text"
              className="exchange__input"
              placeholder="имя"
              autoComplete="off"
              value={name}
              onChange={nameOnChange}
            />
            <input
              type="tel"
              className="exchange__input"
              placeholder="телефон"
              autoComplete="off"
              value={number}
              onChange={numberOnChange}
            />
          </div>
          <button type="submit" className="exchange__btn" onClick={openSuccessModal}>
            перезвоните мне
          </button>
        </form>
        <p className="exchange__error">
          (если мы вам не перезваниваем, то, вероятно, вы ошиблись при указании номера. попробуйте
          еще раз)
        </p>
      </div>
    </section>
  );
};

export default Exchange;
