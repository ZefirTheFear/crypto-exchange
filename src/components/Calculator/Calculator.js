import React, { useState, useEffect, useContext } from "react";

import cloneDeep from "clone-deep";
import { FaAngleDown } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

import Spinner from "../Spinner/Spinner";
import Context from "../../context";

import ImgBTC from "../../assets/img/BTC.png";
import ImgETH from "../../assets/img/ETH.png";
import ImgUSDT from "../../assets/img/usdt.png";
import ImgUSD from "../../assets/img/usd.png";
import ImgUAH from "../../assets/img/uah.png";

import "./Calculator.scss";

const Calculator = () => {
  const context = useContext(Context);

  const dataFromCurrency = [
    {
      name: "BTC",
      img: ImgBTC,
      price: null
    },
    {
      name: "ETH",
      img: ImgETH,
      price: null
    },
    {
      name: "USDT",
      img: ImgUSDT,
      price: 1
    }
  ];

  const dataToCurrency = [
    {
      name: "USD",
      img: ImgUSD,
      price: 1
    },
    {
      name: "UAH",
      img: ImgUAH,
      price: null
    }
  ];

  const percentBuy = 1.7;
  const percentSale = 1.7;

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBinance, setIsLoadingBinance] = useState(true);
  const [isLoadingUAH, setIsLoadingUAH] = useState(true);

  const [isBuyCrypto, setIsBuyCrypto] = useState(true);
  const [isSwapLoading, setIsSwapLoading] = useState(false);

  const [fromCurrencies, setFromCurrencies] = useState(dataFromCurrency);
  const [toCurrencies, setToCurrencies] = useState(dataToCurrency);
  const [currentFromCurrency, setCurrentFromCurrency] = useState(dataFromCurrency[0]);
  const [isFromCurrencyOpen, setIsFromCurrencyOpen] = useState(false);
  const [currentToCurrency, setCurrentToCurrency] = useState(dataToCurrency[0]);
  const [isToCurrencyOpen, setIsToCurrencyOpen] = useState(false);

  useEffect(() => {
    fetchPrices();
    fetchUAHUSD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoadingBinance && !isLoadingUAH) {
      setIsLoading(false);
    }
  }, [isLoadingBinance, isLoadingUAH]);

  useEffect(() => {
    setIsSwapLoading(false);
  }, [isBuyCrypto]);

  const fetchPrices = async () => {
    try {
      const response = await fetch("https://apiv2.bitcoinaverage.com/exchanges/ticker/binance");
      // const response = await fetch(" https://dex.binance.org/api/v1/ticker/24hr");
      // const response = await fetch("https://coinograph.io/ticker/?symbol=binance:btcusdt");
      if (response.status !== 200) {
        return context.setIsError(true);
      }
      let resData = await response.json();
      let cloneFromCurrencies = cloneDeep(fromCurrencies);
      cloneFromCurrencies.forEach(item => {
        if (item.name === "BTC") {
          item.price = resData.symbols.BTCUSDT.last;
        }
        if (item.name === "ETH") {
          item.price = resData.symbols.ETHUSDT.last;
        }
      });
      setFromCurrencies(cloneFromCurrencies);
      console.log(cloneFromCurrencies);

      setCurrentFromCurrency(cloneFromCurrencies[0]);
      setIsLoadingBinance(false);
    } catch (error) {
      context.setIsError(true);
    }
  };

  const fetchUAHUSD = async () => {
    try {
      const response = await fetch(
        `https://exchange-currency-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        return context.setIsError(true);
      }
      let resData = await response.json();
      let cloneToCurrencies = cloneDeep(toCurrencies);
      cloneToCurrencies.forEach(item => {
        if (item.name === "UAH") {
          item.price = 1 / resData.usd.buy;
        }
      });
      setToCurrencies(cloneToCurrencies);
      console.log(cloneToCurrencies);

      setCurrentToCurrency(cloneToCurrencies[0]);
      setIsLoadingUAH(false);
    } catch (error) {
      context.setIsError(true);
    }
  };

  const showToCurrencyAmount = e => {
    if (e.target.value === "") {
      return (document.querySelector(".calculator__to-currency-input").value = "");
    }
    document.querySelector(".calculator__to-currency-input").value = (
      (e.target.value *
        (isBuyCrypto
          ? currentFromCurrency.price * ((100 - percentBuy) / 100)
          : currentFromCurrency.price)) /
      (isBuyCrypto
        ? currentToCurrency.price
        : currentToCurrency.price * ((100 + percentSale) / 100))
    ).toFixed(4);
  };

  const showFromCurrencyAmount = e => {
    if (e.target.value === "") {
      return (document.querySelector(".calculator__from-currency-input").value = "");
    }
    document.querySelector(".calculator__from-currency-input").value = (
      (e.target.value *
        (isBuyCrypto
          ? currentToCurrency.price
          : currentToCurrency.price * ((100 + percentSale) / 100))) /
      (isBuyCrypto
        ? currentFromCurrency.price * ((100 - percentBuy) / 100)
        : currentFromCurrency.price)
    ).toFixed(4);
  };

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
    if (document.querySelector(".calculator__from-currency-input").value !== "") {
      document.querySelector(".calculator__to-currency-input").value = (
        (document.querySelector(".calculator__from-currency-input").value *
          (isBuyCrypto ? currency.price * ((100 - percentBuy) / 100) : currency.price)) /
        (isBuyCrypto
          ? currentToCurrency.price
          : currentToCurrency.price * ((100 + percentSale) / 100))
      ).toFixed(4);
    }
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
    if (document.querySelector(".calculator__to-currency-input").value !== "") {
      document.querySelector(".calculator__from-currency-input").value = (
        (document.querySelector(".calculator__to-currency-input").value *
          (isBuyCrypto ? currency.price : currency.price * ((100 + percentSale) / 100))) /
        (isBuyCrypto
          ? currentFromCurrency.price * ((100 - percentBuy) / 100)
          : currentFromCurrency.price)
      ).toFixed(4);
    }
    setCurrentToCurrency(currency);
    closeToCurrency();
  };

  const swapCurrencies = () => {
    if (isSwapLoading) {
      return;
    }
    setIsSwapLoading(true);

    if (document.querySelector(".calculator__from-currency-input").value !== "") {
      document.querySelector(".calculator__to-currency-input").value = document.querySelector(
        ".calculator__from-currency-input"
      ).value;
      document.querySelector(".calculator__from-currency-input").value = (
        (document.querySelector(".calculator__from-currency-input").value *
          (isBuyCrypto
            ? currentFromCurrency.price * ((100 + percentSale) / 100)
            : currentFromCurrency.price)) /
        (isBuyCrypto
          ? currentToCurrency.price
          : currentToCurrency.price * ((100 - percentBuy) / 100))
      ).toFixed(4);
    }

    const cloneFromCurrencies = cloneDeep(fromCurrencies);
    const cloneToCurrencies = cloneDeep(toCurrencies);
    setFromCurrencies(cloneToCurrencies);
    setCurrentFromCurrency(cloneToCurrencies[0]);
    setToCurrencies(cloneFromCurrencies);
    setCurrentToCurrency(cloneFromCurrencies[0]);

    setIsBuyCrypto(!isBuyCrypto);
  };

  return (
    <section className="calculator-section">
      <div className="calculator-section__inner">
        {isLoading ? (
          <Spinner />
        ) : (
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
                  {fromCurrencies.map(currency => {
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
                  autoComplete="off"
                  onChange={showToCurrencyAmount}
                />
              </div>
            </div>
            <div className="calculator__swaper" onClick={swapCurrencies}>
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
                  {toCurrencies.map(currency => {
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
                  autoComplete="off"
                  onChange={showFromCurrencyAmount}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calculator;
