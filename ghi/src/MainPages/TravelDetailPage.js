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
    <div>
      <div className="travel-page">
        <div className="detail-page-header">
          <h1>Hi {user?.username}! </h1>
          <h2 className="detail-page-header-text display-4 fw-normal text-center g-5">
            Create a packing list for {destination_city}, {destination_country}!
          </h2>
          <img src="../travel-bags.png" alt="bags" className="bags" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col item-column detail-columns">
              <UserItemForm setItems={setItems} items={items} />
              <SuggestedItems setItems={setItems} items={items} />
            </div>
            <div className="col item-column detail-columns">
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
            <div className="col data-column detail-columns">
              <div className="row">
                <WeatherChart
                  destination_city={destination_city}
                  destination_country={destination_country}
                  departure_date={departure_date}
                  return_date={return_date}
                />
              </div>
              <div className="row currency-data">
                <CurrencyInfo
                  origin_code={origin_code}
                  destination_code={destination_code}
                  detailPage={false}
                />
              </div>
            </div>
            <div>
              <img
                src="../travel-suitcases.png"
                alt="suitcases"
                className="suitcases"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
