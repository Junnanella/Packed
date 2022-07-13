import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Nav from "./Components/Nav";
import TravelDetailPage from "./Components/TravelDetailPage";

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
