// NOT YET IMPLEMENTED FEATURE
// Uncomment the below when ready to implement Flights feature into application

// import React from "react";
// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   //   Title,
// } from "chart.js";
// import { loadFlightData } from "./LoadApiData";

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

// const useFlightData = () => {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const flight_response = await loadFlightData(
//         "San Francisco",
//         "New York",
//         "2022-06-14",
//         "2022-05-14"
//       );
//       setFlights(flight_response);
//     }
//     fetchData();
//   }, []);

//   return flights;
// };

// export default function FlightChart() {
//   const flights = useFlightData();

//   const date_list = flights.map(({ date }) => date);
//   const cost_list = flights.map(({ cost }) => cost);

//   const data = {
//     labels: date_list,
//     datasets: [
//       {
//         label: "Flights",
//         backgroundColor: "rgba(71, 225, 167, 0.5)",
//         borderColor: "rgb(71, 225, 167)",
//         data: cost_list,
//       },
//     ],
//   };

//   return (
//     <div className="container-sm offset-1">
//       <h3 className="mt-5">Flights Chart</h3>
//       <Line data={data} options={{ responsive: true }} />
//     </div>
//   );
// }
