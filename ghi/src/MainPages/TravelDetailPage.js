// import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Chart from "../AfterSubmit/WeatherChart";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");

  // const [currency, setCurrency] = useState();
  // const [flights, setFlights] = useState();

  // useEffect(() => {
  //   async function fetchData() {
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

  return (
    <div>
      <Chart />
    </div>
  );
}
