// import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { loadWeatherData, loadCurrencyData, loadFlightData } from "./MainApi";
import Chart from "./Charts";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");

  console.log(origin, destination, departure_date, return_date);

  // define state for render data
  // match initial data type to
  // const [weather, setWeather] = useState();
  // const [currency, setCurrency] = useState();
  // const [flights, setFlights] = useState();

  // useEffect(() => {
  //   async function fetchData() {
  //     const weather = await loadWeatherData(
  //       destination,
  //       departure_date,
  //       return_date
  //     );
  //     const currency = loadCurrencyData(destination);
  //     const flights = loadFlightData(
  //       origin,
  //       destination,
  //       departure_date,
  //       return_date
  //     );

  //     setWeather(weather);
  //     setCurrency(currency);
  //     setFlights(flights);
  //   }
  //   fetchData();
  // }, [origin, destination, departure_date, return_date]);

  // <p>{weather}</p>
  // <p>{currency}</p>
  // <p>{flights}</p>
  return (
    <div>
      <Chart />
    </div>
  );
}
