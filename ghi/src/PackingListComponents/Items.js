// list of items suggested from the back end
// table of items with an add button
// items could be split into categories
// rendered file, fetching in packinglistAPI
import React, { useEffect, useState } from "react";
import { loadItemsList } from "./PackingListApi";

export default function SuggestedItems(props) {
  const [conditionalItems, setConditionalItems] = useState([]);
  const [generalItems, setGeneralItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await loadItemsList("cold");
      console.log("response", response);
      const conditional = response.conditional_items;
      const general = response.general_items;
      setConditionalItems(conditional);
      setGeneralItems(general);
    }
    fetchData();
  }, []);

  console.log("conditionalItems", conditionalItems);
  console.log("generalItems", generalItems);

  return (
    <div className="container">
      <div className="input-group mb-3">
        <div>
          <h3>Conditional Items</h3>
          {conditionalItems.map((conditional) => {
            return <p>{conditional.name}</p>;
          })}
          <h3>General Items</h3>
          {generalItems.map((general) => {
            return <p>{general.name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
