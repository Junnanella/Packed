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

  if (weather.temps === undefined) {
    return "Loading...";
  }

  const weatherIcon = weather.temps.map((weather) => {
    if (weather.temperature > 70) {
      return (
        <th key={weather.id} className="weather-data">
          <img src="../sun.png" alt="sun" className="weather-icon" />
        </th>
      );
    } else if (weather.temperature < 70 && weather.temperature > 55) {
      return (
        <th key={weather.id} className="weather-data">
          <img src="../cloudy.png" alt="cloudy" className="weather-icon" />
        </th>
      );
    } else {
      return (
        <th key={weather.id} className="weather-data">
          <img
            src="../snowflake.jpeg"
            alt="snowflake"
            className="weather-icon"
          />
        </th>
      );
    }
  });

  return (
    <div className="container-sm offset-1 weather-component">
      <h3 className="mt-5">Expected Weather</h3>
      <table className="weather-table">
        <thead>
          <tr>{weatherIcon}</tr>
        </thead>
        <tbody>
          <tr>
            {weather.temps.map((weather) => {
              return <td key={weather.id}>{weather.date}</td>;
            })}
          </tr>
          <tr>
            {weather.temps.map((weather) => {
              return <td key={weather.id}>{weather.temperature}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
