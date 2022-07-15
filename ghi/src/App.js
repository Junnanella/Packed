import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPages/MainPage";
import Nav from "./MainPages/Nav";
import TravelDetailPage from "./MainPages/TravelDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/travel_details" element={<TravelDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
