import { TripForm } from "./TripForm";

export default function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">packed</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">blurb blurb blurb</p>
      </div>
      <div>
        <TripForm />
      </div>
    </div>
  );
}
