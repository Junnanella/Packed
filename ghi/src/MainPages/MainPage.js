import { TripForm } from "./TripForm";
import "./pages.css";
import group from "../Images/group.png"

export default function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center main-page-background shadow">
      <div className="row">
        <div className="col-sm-12 d-block d-lg-none d-xl-none d-xxl-none">
          <h4 className="small-screen-blurb">Let's start planning!</h4>
        </div>
        <div className="col-sm-12 col-md-4 d-none d-lg-block">
          <img
            className="app-blurb"
            src="./front_open_suitcase_blurb.png"
            alt="blurb"
          />
        </div>
        <div className="col-sm-12 col-md">
          <TripForm />
        </div>
      </div>
      <div className="row">
        <img className="group-pic" src={group} alt="group" />
      </div>
      </div>
  );
}
