// import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import WeatherChart from "../DataCharts/WeatherChart";
import FlightChart from "../DataCharts/FlightChart";
import CurrencyInfo from "../DataCharts/CurrencyInfo";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");

  // Will need to pass the above variable to the corresponding components
  return (
    <div>
      <WeatherChart />
      <FlightChart />
      <CurrencyInfo />
    </div>
  );
}
