// import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import WeatherChart from "../DataCharts/WeatherChart";
import FlightChart from "../DataCharts/FlightChart";
import CurrencyInfo from "../DataCharts/CurrencyInfo";
import { UserItemForm } from "../PackingListComponents/UserInputItems";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const destination_city = searchParams.get("destination_city");
  const destination_country = searchParams.get("destination_country");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");

  // Will need to pass the above variable to the corresponding components
  return (
    <div className="container">
      <div className="row">
        <div className="col p-3">
          <UserItemForm />
        </div>
        <div className="col g-2">
          <div className="row">
            <WeatherChart
              destination_city={destination_city}
              destination_country={destination_country}
            />
          </div>
          <div className="row">
            <FlightChart />
          </div>
          <div className="row gx-5">
            <CurrencyInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
