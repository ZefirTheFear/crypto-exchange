import React, { useState, useEffect } from "react";

import { FaAngleDown } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

import ImgBTC from "../../assets/img/BTC.png";
import ImgETH from "../../assets/img/ETH.png";
import ImgUSDT from "../../assets/img/usdt.png";
import ImgUSD from "../../assets/img/usd.png";
import ImgUAH from "../../assets/img/uah.png";

import "./Calculator.scss";

const Calculator = () => {
  const dataFromCurrency = [
    {
      name: "BTC",
      img: ImgBTC
    },
    {
      name: "ETH",
      img: ImgETH
    },
    {
      name: "USDT",
      img: ImgUSDT
    }
  ];

  const dataToCurrency = [
    {
      name: "USD",
      img: ImgUSD
    },
    {
      name: "UAH",
      img: ImgUAH
    }
  ];

  const [price, setPrice] = useState([]);

  const [currentFromCurrency, setCurrentFromCurrency] = useState(dataFromCurrency[0]);
  const [isFromCurrencyOpen, setIsFromCurrencyOpen] = useState(false);
  const [currentToCurrency, setCurrentToCurrency] = useState(dataToCurrency[0]);
  const [isToCurrencyOpen, setIsToCurrencyOpen] = useState(false);

  useEffect(() => {
    fetchPrices();
    fetchUAHUSD();
  }, []);

  const toggleFromCurrency = () => {
    isFromCurrencyOpen ? closeFromCurrency() : openFromCurrency();
  };

  const openFromCurrency = () => {
    document
      .querySelector(".calculator__from-currency-select-wrapper")
      .classList.add("calculator__from-currency-select-wrapper_opened");
    setIsFromCurrencyOpen(true);
  };

  const closeFromCurrency = () => {
    document
      .querySelector(".calculator__from-currency-select-wrapper")
      .classList.remove("calculator__from-currency-select-wrapper_opened");
    setIsFromCurrencyOpen(false);
  };

  const selectFromCurrency = currency => {
    setCurrentFromCurrency(currency);
    closeFromCurrency();
  };

  const toggleToCurrency = () => {
    isToCurrencyOpen ? closeToCurrency() : openToCurrency();
  };

  const openToCurrency = () => {
    document
      .querySelector(".calculator__to-currency-select-wrapper")
      .classList.add("calculator__to-currency-select-wrapper_opened");
    setIsToCurrencyOpen(true);
  };

  const closeToCurrency = () => {
    document
      .querySelector(".calculator__to-currency-select-wrapper")
      .classList.remove("calculator__to-currency-select-wrapper_opened");
    setIsToCurrencyOpen(false);
  };

  const selectToCurrency = currency => {
    setCurrentToCurrency(currency);
    closeToCurrency();
  };

  const fetchPrices = async () => {
    try {
      const response = await fetch("/api/v3/ticker/price");
      if (response.status !== 200) {
        // userContext.setIsError(true);
      }
      let resData = await response.json();
      resData = resData.filter(item => item.symbol === "BTCUSDT" || item.symbol === "ETHUSDT");
      console.log(resData);
      setPrice(resData);
    } catch (error) {
      // userContext.setIsError(true);
    }
  };

  const fetchUAHUSD = async () => {
    try {
      const response = await fetch(
        `https://exchange-currency-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        // userContext.setIsError(true);
      }
      let resData = await response.json();
      // resData = resData.filter(item => item.symbol === "BTCUSDT" || item.symbol === "ETHUSDT");
      console.log(resData);
      // setPrice(resData);
    } catch (error) {
      // userContext.setIsError(true);
    }
  };

  const showPriceTo = e => {
    console.log(e.target.value);
  };
  const showPriceFrom = e => {
    console.log(e.target.value);
  };

  return (
    <section className="calculator-section">
      <div className="calculator-section__inner">
        <div className="calculator">
          <div className="calculator__from-currency">
            <div className="calculator__from-currency-title">вы отдаете</div>
            <div className="calculator__from-currency-select-wrapper">
              <div
                className="calculator__from-currency-select-default"
                onClick={toggleFromCurrency}
              >
                <img
                  src={currentFromCurrency.img}
                  alt={currentFromCurrency.name + "-logo"}
                  className="calculator__from-currency-img"
                />
                <span className="calculator__from-currency-name">{currentFromCurrency.name}</span>
                <span className="calculator__from-currency-select-arrow">
                  <FaAngleDown />
                </span>
              </div>
              <div className="calculator__from-currency-select-options">
                {dataFromCurrency.map(currency => {
                  return (
                    <div
                      key={currency.name}
                      className="calculator__from-currency-select-option"
                      onClick={() => selectFromCurrency(currency)}
                    >
                      <img
                        src={currency.img}
                        alt={currency.name + "-logo"}
                        className="calculator__from-currency-img"
                      />
                      <span className="calculator__from-currency-name">{currency.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="calculator__from-currency-input-wrapper">
              <input
                type="number"
                className="calculator__from-currency-input"
                placeholder="0.00"
                onChange={showPriceTo}
              />
            </div>
          </div>
          <div className="calculator__swaper">
            <FaExchangeAlt />
          </div>
          <div className="calculator__to-currency">
            <div className="calculator__to-currency-title">вы получаете</div>
            <div className="calculator__to-currency-select-wrapper">
              <div className="calculator__to-currency-select-default" onClick={toggleToCurrency}>
                <img
                  src={currentToCurrency.img}
                  alt={currentToCurrency.name + "-logo"}
                  className="calculator__to-currency-img"
                />
                <span className="calculator__to-currency-name">{currentToCurrency.name}</span>
                <span className="calculator__to-currency-select-arrow">
                  <FaAngleDown />
                </span>
              </div>
              <div className="calculator__to-currency-select-options">
                {dataToCurrency.map(currency => {
                  return (
                    <div
                      key={currency.name}
                      className="calculator__to-currency-select-option"
                      onClick={() => selectToCurrency(currency)}
                    >
                      <img
                        src={currency.img}
                        alt={currency.name + "-logo"}
                        className="calculator__to-currency-img"
                      />
                      <span className="calculator__to-currency-name">{currency.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="calculator__to-currency-input-wrapper">
              <input
                type="number"
                className="calculator__to-currency-input"
                placeholder="0.00"
                onChange={showPriceFrom}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
