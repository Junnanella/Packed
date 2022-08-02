import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { loadPackingLists } from "./MainApi";

export const PackingLists = () => {
  const [packingLists, setPackingLists] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const packingLists = await loadPackingLists(authTokens);
      setPackingLists(packingLists);
    }
    fetchData();
  }, [authTokens]);

  return (
    <div className="row">
      {packingLists.map((list) => {
        return (
          <div className="col-sm-6">
            <div className="card">
              <div key={list.id} className="card-body border-round">
                <h5 className="card-title">{list.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  created: {list.created}
                </h6>
                <p className="card-text">
                  Departure Date: {list.departure_date}
                  <br />
                  Return Date: {list.return_date}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
