import React, { useEffect, useState } from "react";
import { loadCurrencyData } from "./LoadApiData";

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

  return (
    <div className="container-sm offset-1">
      <h4>
        1 {origin_code} = {currencyRate} {destination_code}
      </h4>
    </div>
  );
}
