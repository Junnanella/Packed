import React, { useState, useEffect, useContext } from "react";
import { loadPackingLists } from "./PackingListApi";
import AuthContext from "../context/AuthContext";

export const PackingLists = () => {
  const [packingLists, setPackingLists] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const packingLists = await loadPackingLists(authTokens);
      console.log("PackingLists", packingLists);
      setPackingLists(packingLists);
    }
    fetchData();
  }, []);

  return <p>{packingLists[0].title}</p>;
};
