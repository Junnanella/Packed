import React from "react";
import { useState, useEffect } from "react";
import { loadWeatherData } from "./LoadApiData";
import "./data.css";

const useWeatherData = (destination_city, destination_country) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const weather_response = await loadWeatherData(
        destination_city,
        destination_country
      );
      setWeather(weather_response);
    }
    fetchData();
  }, [destination_city, destination_country]);

  return weather;
};

export default function WeatherChart(props) {
  const { destination_city, destination_country } = props;
  const weather = useWeatherData(destination_city, destination_country);

  console.log(weather.temps);

  return (
    <div className="container-sm offset-1 weather-component">
      <h3 className="mt-5">Expected Weather</h3>
      {/* <table className="weather-table">
        <thead>
          {weather.temps.map((temp) => {
            if (temp.temperature > 70) {
              return (
                <th>
                  <img src="../sun.png" alt="sun" className="weather-icon" />
                </th>
              );
            } else {
              return (
                <th>
                  <img src="../sun.png" alt="sun" className="weather-icon" />
                </th>
              );
            }
          })}
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            {weather.temps.map((date) => {
              return <td>{date.date}</td>;
            })}
          </tr>
          <tr>
            {weather.temps.map((temp) => {
              return <td>{temp.temperature}</td>;
            })}
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}
