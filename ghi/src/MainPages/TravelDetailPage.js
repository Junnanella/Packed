import { useSearchParams } from "react-router-dom";
import WeatherChart from "../DataCharts/WeatherChart";
import FlightChart from "../DataCharts/FlightChart";
import CurrencyInfo from "../DataCharts/CurrencyInfo";
import { UserItemForm } from "../PackingListComponents/UserInputItems";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin_country = searchParams.get("origin_country");
  const origin_code = searchParams.get("origin_code");
  const destination_city = searchParams.get("destination_city");
  const destination_country = searchParams.get("destination_country");
  const destination_code = searchParams.get("destination_code");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");

  // Will need to pass the above variable to the corresponding components
  return (
    <div>
      <h1 className="display-4 fw-normal text-center">
        Get ready to pack for {destination_city}, {destination_country}!
      </h1>
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
              <CurrencyInfo
                origin_code={origin_code}
                destination_code={destination_code}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
