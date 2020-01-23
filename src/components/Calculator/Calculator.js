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

  const [lastModified, setLastModified] = useState();

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
        `https://exchange-currencies-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        return context.setIsError(true);
      }
      let resData = await response.json();
      console.log(resData);
      let cloneToCurrencies = cloneDeep(toCurrencies);
      cloneToCurrencies.forEach(item => {
        if (item.name === "UAH") {
          item.price = 1 / resData.usd.buy.rate;
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

  const valueWithPercentage = (valueInUSD, value) => {
    if (valueInUSD < 1000) {
      return value * ((100 + 2) / 100);
    } else if (valueInUSD >= 1000 && valueInUSD < 5000) {
      return value * ((100 + 1.7) / 100);
    } else if (valueInUSD >= 5000 && valueInUSD < 10000) {
      return value * ((100 + 1.5) / 100);
    } else if (valueInUSD >= 10000 && valueInUSD < 20000) {
      return value * ((100 + 1.2) / 100);
    } else if (valueInUSD >= 20000 && valueInUSD < 50000) {
      return value * ((100 + 1) / 100);
    } else if (valueInUSD >= 50000) {
      return value * ((100 + 0.8) / 100);
    }
  };

  const valueWithoutPercentage = (valueInUSD, value) => {
    if (valueInUSD < 1000) {
      return value * ((100 - 2) / 100);
    } else if (valueInUSD >= 1000 && valueInUSD < 5000) {
      return value * ((100 - 1.7) / 100);
    } else if (valueInUSD >= 5000 && valueInUSD < 10000) {
      return value * ((100 - 1.5) / 100);
    } else if (valueInUSD >= 10000 && valueInUSD < 20000) {
      return value * ((100 - 1.2) / 100);
    } else if (valueInUSD >= 20000 && valueInUSD < 50000) {
      return value * ((100 - 1) / 100);
    } else if (valueInUSD >= 50000) {
      return value * ((100 - 0.8) / 100);
    }
  };

  const changeFromCurrencyAmount = e => {
    setLastModified("from");
    if (e.target.value === "") {
      return (document.querySelector(".calculator__to-currency-input").value = "");
    }
    if (e.target.value < 0) {
      document.querySelector(".calculator__from-currency-input").value = e.target.value * -1;
    }
    if (currentFromCurrency.name === "BTC" && e.target.value > 9999) {
      document.querySelector(".calculator__from-currency-input").value = 9999;
    }
    if (currentFromCurrency.name === "ETH" && e.target.value > 99999) {
      document.querySelector(".calculator__from-currency-input").value = 99999;
    }
    if (currentFromCurrency.name === "USDT" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }
    if (currentFromCurrency.name === "USD" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }
    if (currentFromCurrency.name === "UAH" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }

    const valueInUSD = e.target.value * currentFromCurrency.price;
    if (isBuyCrypto) {
      document.querySelector(".calculator__to-currency-input").value = (
        (e.target.value * valueWithoutPercentage(valueInUSD, currentFromCurrency.price)) /
        currentToCurrency.price
      ).toFixed(2);
    } else {
      document.querySelector(".calculator__to-currency-input").value = (
        (e.target.value * currentFromCurrency.price) /
        valueWithPercentage(valueInUSD, currentToCurrency.price)
      ).toFixed(4);
    }
  };

  const changeToCurrencyAmount = e => {
    setLastModified("to");
    if (e.target.value === "") {
      return (document.querySelector(".calculator__from-currency-input").value = "");
    }
    if (e.target.value < 0) {
      document.querySelector(".calculator__to-currency-input").value = e.target.value * -1;
    }
    if (currentFromCurrency.name === "BTC" && e.target.value > 9999) {
      document.querySelector(".calculator__from-currency-input").value = 9999;
    }
    if (currentFromCurrency.name === "ETH" && e.target.value > 99999) {
      document.querySelector(".calculator__from-currency-input").value = 99999;
    }
    if (currentFromCurrency.name === "USDT" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }
    if (currentFromCurrency.name === "USD" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }
    if (currentFromCurrency.name === "UAH" && e.target.value > 9999999) {
      document.querySelector(".calculator__from-currency-input").value = 9999999;
    }

    const valueInUSD = e.target.value * currentToCurrency.price;
    if (isBuyCrypto) {
      document.querySelector(".calculator__from-currency-input").value = (
        (e.target.value * currentToCurrency.price) /
        valueWithoutPercentage(valueInUSD, currentFromCurrency.price)
      ).toFixed(4);
    } else {
      document.querySelector(".calculator__from-currency-input").value = (
        (e.target.value * valueWithPercentage(valueInUSD, currentToCurrency.price)) /
        currentFromCurrency.price
      ).toFixed(2);
    }
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
      if (lastModified === "from") {
        const valueInUSD =
          document.querySelector(".calculator__from-currency-input").value * currency.price;
        if (isBuyCrypto) {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value *
              valueWithoutPercentage(valueInUSD, currency.price)) /
            currentToCurrency.price
          ).toFixed(2);
        } else {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value * currency.price) /
            valueWithPercentage(valueInUSD, currentToCurrency.price)
          ).toFixed(4);
        }
      } else {
        const valueInUSD =
          document.querySelector(".calculator__to-currency-input").value * currentToCurrency.price;

        if (isBuyCrypto) {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value *
              currentToCurrency.price) /
            valueWithoutPercentage(valueInUSD, currency.price)
          ).toFixed(4);
        } else {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value *
              valueWithPercentage(valueInUSD, currentToCurrency.price)) /
            currency.price
          ).toFixed(2);
        }
      }
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
      if (lastModified === "to") {
        const valueInUSD =
          document.querySelector(".calculator__to-currency-input").value * currency.price;

        if (isBuyCrypto) {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value * currency.price) /
            valueWithoutPercentage(valueInUSD, currentFromCurrency.price)
          ).toFixed(4);
        } else {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value *
              valueWithPercentage(valueInUSD, currency.price)) /
            currentFromCurrency.price
          ).toFixed(2);
        }
      } else {
        const valueInUSD =
          document.querySelector(".calculator__from-currency-input").value *
          currentFromCurrency.price;

        if (isBuyCrypto) {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value *
              valueWithoutPercentage(valueInUSD, currentFromCurrency.price)) /
            currency.price
          ).toFixed(2);
        } else {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value *
              currentFromCurrency.price) /
            valueWithPercentage(valueInUSD, currency.price)
          ).toFixed(4);
        }
      }
    }
    setCurrentToCurrency(currency);
    closeToCurrency();
  };

  const swapCurrencies = () => {
    if (isSwapLoading) {
      return;
    }
    closeToCurrency();
    closeFromCurrency();
    setIsSwapLoading(true);
    if (document.querySelector(".calculator__from-currency-input").value !== "") {
      if (lastModified === "from") {
        document.querySelector(".calculator__to-currency-input").value = document.querySelector(
          ".calculator__from-currency-input"
        ).value;
        const valueInUSD =
          document.querySelector(".calculator__from-currency-input").value *
          currentFromCurrency.price;

        if (isBuyCrypto) {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value *
              valueWithPercentage(valueInUSD, currentFromCurrency.price)) /
            currentToCurrency.price
          ).toFixed(2);
        } else {
          document.querySelector(".calculator__from-currency-input").value = (
            (document.querySelector(".calculator__from-currency-input").value *
              currentFromCurrency.price) /
            valueWithoutPercentage(valueInUSD, currentToCurrency.price)
          ).toFixed(4);
        }
        setLastModified("to");
      } else {
        document.querySelector(".calculator__from-currency-input").value = document.querySelector(
          ".calculator__to-currency-input"
        ).value;
        const valueInUSD =
          document.querySelector(".calculator__to-currency-input").value * currentToCurrency.price;

        if (isBuyCrypto) {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value *
              currentToCurrency.price) /
            valueWithPercentage(valueInUSD, currentFromCurrency.price)
          ).toFixed(4);
        } else {
          document.querySelector(".calculator__to-currency-input").value = (
            (document.querySelector(".calculator__to-currency-input").value *
              valueWithoutPercentage(valueInUSD, currentToCurrency.price)) /
            currentFromCurrency.price
          ).toFixed(2);
        }
        setLastModified("from");
      }
    }

    const cloneFromCurrencies = cloneDeep(fromCurrencies);
    const cloneToCurrencies = cloneDeep(toCurrencies);
    const cloneCurrentFromCurrency = cloneDeep(currentFromCurrency);
    const cloneCurrentToCurrency = cloneDeep(currentToCurrency);
    setFromCurrencies(cloneToCurrencies);
    setCurrentFromCurrency(cloneCurrentToCurrency);
    setToCurrencies(cloneFromCurrencies);
    setCurrentToCurrency(cloneCurrentFromCurrency);

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
                  onChange={changeFromCurrencyAmount}
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
                  onChange={changeToCurrencyAmount}
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
