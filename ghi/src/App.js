import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import MainPage from "./MainPages/MainPage";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./MainPages/Nav";
import TravelDetailPage from "./MainPages/TravelDetailPage";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import TestComponent from "./Auth/TestComponent";
import { PackingLists } from "./PackingListComponents/PackingLists";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} exact />
            <Route path="/travel_details" element={<TravelDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/test-component"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
            <Route path="/packinglists" element={<PackingLists />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
