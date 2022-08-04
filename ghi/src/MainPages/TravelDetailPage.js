import { useSearchParams } from "react-router-dom";
import WeatherChart from "../DataCharts/WeatherChart";
// import FlightChart from "../DataCharts/FlightChart";
import CurrencyInfo from "../DataCharts/CurrencyInfo";
import { UserItemForm } from "../PackingListComponents/UserInputItems";
import SuggestedItems from "../PackingListComponents/Items";
import WorkingList from "../PackingListComponents/WorkingList";
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./pages.css";

export default function TravelDetailPage() {
  const [searchParams] = useSearchParams();
  const origin_country = searchParams.get("origin_country");
  const origin_code = searchParams.get("origin_code");
  const destination_city = searchParams.get("destination_city");
  const destination_country = searchParams.get("destination_country");
  const destination_code = searchParams.get("destination_code");
  const departure_date = searchParams.get("departure_date");
  const return_date = searchParams.get("return_date");
  const [items, setItems] = useState([]);
  let { user } = useContext(AuthContext);

  // Will need to pass the above variable to the corresponding components
  return (
    <div className="travel-page shadow mx-5 my-5 py-3">
      <div className="container">
        <div className="detail-page-header">
          <h1>Hi {user?.username}! </h1>
          <h2 className="d-none d-lg-block detail-page-header-text display-4 fw-normal text-center g-5">
            Create a packing list for {destination_city}, {destination_country}!
          </h2>
          <h5 className="d-block d-lg-none d-xl-none d-xxl-none">
            Let's get packing!
          </h5>
        </div>
        <div className="container">
          <img
            src="../travel-bags.png"
            alt="bags"
            className="bags d-none d-lg-block"
          />
          <div className="row">
            <div className="col-sm-12 col-md col-lg item-column detail-columns shadow">
              <UserItemForm setItems={setItems} items={items} />
              <SuggestedItems setItems={setItems} items={items} />
            </div>
            <div className="col-sm-12 col-md col-lg item-column detail-columns shadow">
              <WorkingList
                setItems={setItems}
                items={items}
                destination_city={destination_city}
                destination_country={destination_country}
                departure_date={departure_date}
                return_date={return_date}
                origin_country={origin_country}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg data-column detail-columns shadow">
              <WeatherChart
                destination_city={destination_city}
                destination_country={destination_country}
                departure_date={departure_date}
                return_date={return_date}
              />
              <CurrencyInfo
                origin_code={origin_code}
                destination_code={destination_code}
                detailPage={false}
                className="currency-data"
              />
            </div>
          </div>
          <img
            src="../travel-suitcases.png"
            alt="suitcases"
            className="suitcases"
          />
        </div>
      </div>
    </div>
  );
}
