import React from "react";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  //   Title,
} from "chart.js";
// import { loadWeatherData } from "./MainApi";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Chart() {
  // const [weather, setWeather] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const weather_response = await loadWeatherData("Seoul", "South Korea");
  //     console.log("weather_response:", weather_response);
  //     setWeather(weather_response);
  //   }
  //   fetchData();
  // }, []);

  // const weather_list = weather.map(({ date }) => date);
  // const temp_list = weather.map(({ temperature }) => temperature);
  const dates = [
    "today",
    "2022-06-14",
    "2022-05-14",
    "2022-04-14",
    "2022-03-14",
    "2022-02-14",
    "2022-01-14",
    "2021-12-14",
    "2021-11-14",
    "2021-10-14",
    "2021-09-14",
    "2021-08-14",
  ];

  const [data] = useState({
    labels: dates,
    datasets: [
      {
        label: "Temperatures",
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        data: [
          78, 71.3, 60.6, 55.6, 47.6, 36.8, 22.8, 37.9, 52.2, 67.6, 76.3, 79.2,
        ],
      },
      //   {
      //     label: "Flight Costs",
      //     backgroundColor: "rgba(71, 225, 167, 0.5)",
      //     borderColor: "rgb(71, 225, 167)",
      //     data: [165, 259, 290, 181, 256, 255, 340, 290, 175, 180, 77, 167],
      //   },
    ],
  });

  return (
    <div className="offset-3 col-6">
      <h3 className="mt-5">Sample chart</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}
