import React from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  //   Title,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Chart() {
  const [data] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Temperatures",
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        data: [65, 59, 90, 81, 56, 55, 40, 90, 75, 80, 77, 67],
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
    <div>
      <h3 className="mt-5">Line chart</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}
