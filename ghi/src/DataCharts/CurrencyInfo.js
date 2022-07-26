import React, { useEffect, useState } from "react";
import { loadCurrencyData } from "./LoadApiData";
import "./data.css";

const useCurrencyData = (origin_country, destination_country) => {
  const [currencyRate, setCurrencyRate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const currency_response = await loadCurrencyData(
        origin_country,
        destination_country
      );
      setCurrencyRate(currency_response);
    }
    fetchData();
  }, [origin_country, destination_country]);

  return currencyRate;
};

export default function CurrencyInfo(props) {
  const { origin_code, destination_code } = props;
  const currencyRate = useCurrencyData(origin_code, destination_code);

  const [currencyInput, setCurrencyInput] = useState(1);
  const [exchangeOutput, setExchangeOutput] = useState(0.987);

  const onChangeCurrencyInput = (event) => {
    setCurrencyInput(() => event.target.value);
    setExchangeOutput(() => currencyRate * event.target.value);
  };

  return (
    <div className="container-sm offset-1">
      <h3 className="mt-5">Current Exchange Rate</h3>
      <input
        onChange={onChangeCurrencyInput}
        value={currencyInput}
        placeholder="1"
        required
        type="text"
        name="currency_input"
        id="currency_input"
        className="currency_input"
      />
      <h4 className="currency_output">
        {origin_code} = {exchangeOutput} {destination_code}
      </h4>
    </div>
  );
}
