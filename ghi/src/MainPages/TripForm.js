import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TripForm = (props) => {
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // to navigate to travel details page
  // and pass user input data
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    // need to define the correct attribute names for navigate url
    navigate(
      `/travel_details?origin=${originCountry}&destination_city=${destinationCity}&destination_country=${destinationCountry}&departure_date=${departureDate}&return_date=${returnDate}`
    );
  };

  const onChangeOriginCountry = (event) => {
    setOriginCountry(() => event.target.value);
  };

  const onChangeDestinationCity = (event) => {
    setDestinationCity(() => event.target.value);
  };

  const onChangeDestinationCountry = (event) => {
    setDestinationCountry(() => event.target.value);
  };

  const onChangeDepartureDate = (event) => {
    setDepartureDate(() => event.target.value);
  };

  const onChangeReturnDate = (event) => {
    setReturnDate(() => event.target.value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Enter Trip Details</h1>
          <form onSubmit={onSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={onChangeOriginCountry}
                value={originCountry}
                placeholder="Leaving from"
                required
                type="text"
                name="origin_country"
                id="origin_country"
                className="form-control"
              />
              <label htmlFor="name">Origin Country</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={onChangeDestinationCity}
                value={destinationCity}
                placeholder="Going to"
                required
                type="text"
                name="destination_city"
                id="destination_city"
                className="form-control"
              />
              <label htmlFor="name">Destination City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={onChangeDestinationCountry}
                value={destinationCountry}
                placeholder="Going to"
                required
                type="text"
                name="destination_country"
                id="destination_country"
                className="form-control"
              />
              <label htmlFor="name">Destination Country</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={onChangeDepartureDate}
                value={departureDate}
                placeholder="Departing"
                required
                type="date"
                name="departure_date"
                id="departure_date"
                className="form-control"
              />
              <label htmlFor="name">Departure Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={onChangeReturnDate}
                value={returnDate.return_date}
                placeholder="Returning"
                required
                type="date"
                name="return_date"
                id="return_date"
                className="form-control"
              />
              <label htmlFor="name">Return Date</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
