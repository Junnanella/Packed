import { TripForm } from "./TripForm";
import "./pages.css";
import group from "../Images/group.png"

export default function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center main-page-background shadow">
      <div className="row">
        <div className="col-4 blurb-background">
          {/* <h3 className="app-blurb blurb-text">helping you get </h3>
          <h1 className="blurb-text">packed</h1>
          <h3 className="blurb-text">for your next trip</h3> */}
        </div>
        <div className="col">
          <TripForm />
        </div>
      </div>
      <div className="row">
        <img className="group-pic" src={group} alt="group" />
      </div>
    </div>
  );
}
