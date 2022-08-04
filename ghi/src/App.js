import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import MainPage from "./MainPages/MainPage";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./MainPages/Nav";
import TravelDetailPage from "./MainPages/TravelDetailPage";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import TestComponent from "./Auth/TestComponent";
import { PackingLists } from "./MainPages/PackingLists";
import DetailList from "./MainPages/DetailList";

export default function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Nav />
        <div>
          <Routes>
            <Route path="" element={<MainPage />} exact />
            <Route path="travel_details" element={<TravelDetailPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="test-component"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
            <Route path="packinglists" element={<PackingLists />} />
            <Route path="packing_list" element={<DetailList />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
