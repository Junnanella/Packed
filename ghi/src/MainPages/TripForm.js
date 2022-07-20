import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadLocationsData } from "./MainApi";

export const TripForm = (props) => {
  const [originCountryId, setOriginCountryId] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCountryId, setDestinationCountryId] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [locations, setLocations] = useState([]);

  const locationsById = {};

  for (const location of locations) {
    locationsById[location.id] = location;
  }

  // to navigate to travel details page
  // and pass user input data
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const locations = await loadLocationsData();
      setLocations(locations);
      console.log("locations:", locations);
    }
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    const originCountry = locationsById[originCountryId].country;
    const originCode = locationsById[originCountryId].currency_code;
    const destinationCountry = locationsById[destinationCountryId].country;
    const destinationCode = locationsById[destinationCountryId].currency_code;
    event.preventDefault();
    // need to define the correct attribute names for navigate url
    navigate(
      `/travel_details?origin_country=${originCountry}&origin_code=${originCode}&destination_city=${destinationCity}&destination_country=${destinationCountry}&destination_code=${destinationCode}&departure_date=${departureDate}&return_date=${returnDate}`
    );
  };

  const onChangeOriginCountryId = (event) => {
    setOriginCountryId(() => event.target.value);
  };

  const onChangeDestinationCity = (event) => {
    setDestinationCity(() => event.target.value);
  };

  const onChangeDestinationCountryId = (event) => {
    setDestinationCountryId(() => event.target.value);
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
              <select
                onChange={onChangeOriginCountryId}
                value={originCountryId}
                required
                name="origin_country"
                id="origin_country"
                className="form-select"
              >
                <option value="">Select Origin Country</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.country}
                    </option>
                  );
                })}
              </select>
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
              <select
                onChange={onChangeDestinationCountryId}
                value={destinationCountryId}
                required
                name="destination_country"
                id="destination_country"
                className="form-select"
              >
                <option value="">Select Destination Country</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.country}
                    </option>
                  );
                })}
              </select>
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
