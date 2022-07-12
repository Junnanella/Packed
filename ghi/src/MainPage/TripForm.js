import React, { useState } from "react";

export const TripForm = (props) => {
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [submitIsSuccessful, setSubmitIsSuccessful] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitIsSuccessful(true);
  };

  const onChangeOriginCity = (event) => {
    setOriginCity(() => event.target.value);
  };

  const onChangeDestinationCity = (event) => {
    setDestinationCity(() => event.target.value);
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
                onChange={onChangeOriginCity}
                value={originCity}
                placeholder="Leaving from"
                required
                type="text"
                name="origin_city"
                id="origin_city"
                className="form-control"
              />
              <label htmlFor="name">Origin City</label>
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
          {submitIsSuccessful && (
            <div>Form has been successfully submitted!</div>
          )}
        </div>
      </div>
    </div>
  );
};
