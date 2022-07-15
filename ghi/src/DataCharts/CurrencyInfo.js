import React, { useEffect, useState } from "react";
import { loadCurrencyData } from "./LoadApiData";

const useCurrencyData = () => {
  const [currencyRate, setCurrencyRate] = useState({});

  useEffect(() => {
    async function fetchData() {
      const currency_response = await loadCurrencyData;
      console.log(currency_response);
      setCurrencyRate(currency_response);
    }
    fetchData();
  }, []);
};

export default function CurrencyInfo() {
  const currencyRate = useCurrencyData();
  return "Hi, I'm Currency Info!!";
}
