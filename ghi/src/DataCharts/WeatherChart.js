import React from "react";
import { useState, useEffect } from "react";
import { loadWeatherData } from "./LoadApiData";
import "./data.css";
import sun from "../Images/weather-icons/sun.png"
import cloudy from "../Images/weather-icons/cloudy.png"
import snowflake from "../Images/weather-icons/snowflake.jpeg"

const useWeatherData = (
  destination_city,
  destination_country,
  departure_date,
  return_date,
  setTemperature
) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const weather_response = await loadWeatherData(
        destination_city,
        destination_country,
        departure_date,
        return_date
      );
      setWeather(weather_response);
      if (setTemperature) {
        setTemperature(weather_response);
      }
    }
    fetchData();
  }, [
    destination_city,
    destination_country,
    departure_date,
    return_date,
    setTemperature,
  ]);

  return weather;
};

export default function WeatherChart(props) {
  const {
    destination_city,
    destination_country,
    departure_date,
    return_date,
    detail = null,
    setTemperature = null,
  } = props;
  const weather = useWeatherData(
    destination_city,
    destination_country,
    departure_date,
    return_date,
    setTemperature
  );

  if (weather === undefined) {
    return "Loading...";
  }

  const weatherIcon = weather.map((weather) => {
    if (weather.temperature > 70) {
      return (
        <th key={weather.id} className="weather-data">
          <img
            src={sun}
            alt="sun"
            className="weather-icon"
          />
        </th>
      );
    } else if (weather.temperature < 70 && weather.temperature > 55) {
      return (
        <th key={weather.id} className="weather-data">
          <img
            src={cloudy}
            alt="cloudy"
            className="weather-icon"
          />
        </th>
      );
    } else {
      return (
        <th key={weather.id} className="weather-data">
          <img
            src={snowflake}
            alt="snowflake"
            className="weather-icon"
          />
        </th>
      );
    }
  });

  return (
    <div className="container-sm weather-component">
      {!detail ? <h3 className="mt-5">Expected Weather</h3> : null}
      <table className="weather-table">
        <thead>
          <tr>{weatherIcon}</tr>
        </thead>
        <tbody>
          <tr>
            {weather.map((weather) => {
              return <td key={weather.id}>{weather.date}</td>;
            })}
          </tr>
          <tr>
            {weather.map((weather) => {
              return <td key={weather.id}>{weather.temperature}°F</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
