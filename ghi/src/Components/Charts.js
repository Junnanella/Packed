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
import { loadWeatherData } from "./MainApi";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const useWeatherData = () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const weather_response = await loadWeatherData("Seoul", "South Korea");
      setWeather(weather_response);
    }
    fetchData();
  }, []);

  return weather;
};

export default function Chart() {
  const weather = useWeatherData();

  const date_list = weather.map(({ date }) => date);
  const temp_list = weather.map(({ temperature }) => temperature);

  const data = {
    labels: date_list,
    datasets: [
      {
        label: "Temperatures",
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        data: temp_list,
      },
      //   {
      //     label: "Flight Costs",
      //     backgroundColor: "rgba(71, 225, 167, 0.5)",
      //     borderColor: "rgb(71, 225, 167)",
      //     data: [165, 259, 290, 181, 256, 255, 340, 290, 175, 180, 77, 167],
      //   },
    ],
  };

  return (
    <div className="offset-3 col-6">
      <h3 className="mt-5">Sample chart</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}
