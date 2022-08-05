import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadLocationsData } from "./MainApi";

export const TripForm = (props) => {
  // variables to set default dates in the form's date input fields
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 8);
  const [departureDate, setDepartureDate] = useState(
    tomorrow.toISOString().slice(0, 10)
  );
  const [returnDate, setReturnDate] = useState(
    nextWeek.toISOString().slice(0, 10)
  );

  const [originCity, setOriginCity] = useState("");
  const [originCountryId, setOriginCountryId] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCountryId, setDestinationCountryId] = useState("");
  const [locations, setLocations] = useState([]);

  // create an object to store location currency code and country name
  // which will then be accessed in the onSubmit function
  const locationsById = {};
  for (const location of locations) {
    locationsById[location.id] = location;
  }

  // to be used in the onSubmit function
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const locations = await loadLocationsData();
      setLocations(locations);
    }
    fetchData();
  }, []);

  // pass user's inputs to Travel Details page through the urls params
  const onSubmit = async (event) => {
    // pull specific data from locationsByID
    const originCountry = locationsById[originCountryId].country;
    const originCode = locationsById[originCountryId].currency_code;
    const destinationCountry = locationsById[destinationCountryId].country;
    const destinationCode = locationsById[destinationCountryId].currency_code;
    event.preventDefault();
    // need to define the correct attribute names for navigate url
    navigate(
      `/travel_details?origin_city=${originCity}&origin_country=${originCountry}&origin_code=${originCode}&destination_city=${destinationCity}&destination_country=${destinationCountry}&destination_code=${destinationCode}&departure_date=${departureDate}&return_date=${returnDate}`
    );
  };

  const onChangeOriginCountryId = (event) => {
    setOriginCountryId(() => event.target.value);
    console.log(originCountryId);
  };

  const onChangeOriginCity = (event) => {
    setOriginCity(() => event.target.value);
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
    <div>
      <div className="p-4 w-80 trip-form shadow">
        <h4>Enter your trip details</h4>
        <form onSubmit={onSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={onChangeOriginCity}
              value={originCity}
              placeholder="Coming from"
              required
              type="text"
              name="origin_city"
              id="origin_city"
              className="form-control form-input"
            />
            <label htmlFor="origin_city">Origin City</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={onChangeOriginCountryId}
              value={originCountryId}
              required
              name="origin_country"
              id="origin_country"
              className="form-select form-input"
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
              className="form-control form-input"
            />
            <label htmlFor="destination_city">Destination City</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={onChangeDestinationCountryId}
              value={destinationCountryId}
              required
              name="destination_country"
              id="destination_country"
              className="form-select form-input"
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
              className="form-control form-input"
            />
            <label htmlFor="name">Departure Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={onChangeReturnDate}
              value={returnDate}
              placeholder="Returning"
              required
              type="date"
              name="return_date"
              id="return_date"
              className="form-control form-input"
            />
            <label htmlFor="name">Return Date</label>
          </div>
          <button className="submit-button" data-testid="cta">
            Get to Packing
          </button>
        </form>
      </div>
    </div>
  );
};
