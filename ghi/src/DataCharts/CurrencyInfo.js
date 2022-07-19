import React, { useEffect, useState } from "react";
import { loadCurrencyData } from "./LoadApiData";

const useCurrencyData = () => {
  const [currencyRate, setCurrencyRate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const currency_response = await loadCurrencyData("EUR", "USD");
      setCurrencyRate(currency_response);
    }
    fetchData();
  }, []);

  return currencyRate;
};

export default function CurrencyInfo() {
  const currencyRate = useCurrencyData();
  const [originCode, setOriginCode] = useState("EUR");
  const [destinationCode, setDestinationCode] = useState("USD");

  return (
    <div className="container-sm offset-3">
      <h4>
        1 {originCode} = {currencyRate} {destinationCode}
      </h4>
    </div>
  );
}
