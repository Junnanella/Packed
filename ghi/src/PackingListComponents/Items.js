// list of items suggested from the back end
// table of items with an add button
// items could be split into categories
// rendered file, fetching in packinglistAPI
import React, { useEffect, useState } from "react";
import { loadItemsList } from "./PackingListApi";

export default function SuggestedItems({setItems, items}) {
  const [conditionalItems, setConditionalItems] = useState([]);
  const [generalItems, setGeneralItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await loadItemsList("cold");
      const conditional = response.conditional_items;
      const general = response.general_items;
      setConditionalItems(conditional);
      setGeneralItems(general);
    }
    fetchData();
  }, []);

  // add onclick with set items in travel detail page , reference user input items

  function validate() {
    const tempItems = [...items]
    for (let i = 0; i < tempItems.length; i ++) {
      let item = tempItems[i]
      for (let generalItem of generalItems) {
        if (item.name.toLowerCase() === generalItem.name.toLowerCase()) {
          setGeneralItems(
            generalItems.filter((generalItem) => generalItem.name.toLowerCase() !== item.name.toLowerCase())
          );
          item.suggested = true
          item.id = generalItem.id
          setItems(tempItems)
        }
      }
      for (let conditionalItem of conditionalItems) {
        if (item.name.toLowerCase() === conditionalItem.name.toLowerCase()) {
          setConditionalItems(
            conditionalItems.filter((conditionalItem) => conditionalItem.name.toLowerCase() !== item.name.toLowerCase())
          );
          item.suggested = true
          item.id = conditionalItem.id
          setItems(tempItems)
        }
      }
    }
  }
  validate();

  function addGItem(newItem) {
    newItem.quantity = 1;
    setItems([...items, newItem]);
    setGeneralItems(generalItems.filter((item) => item.id !== newItem.id));
  }

  function addCItem(newCItem) {
    newCItem.quantity = 1;
    setItems([...items, newCItem]);
    setConditionalItems(
      conditionalItems.filter((item) => item.id !== newCItem.id)
    );
  }

  return (
    <div className="container">
      <h3>Suggested Items</h3>
      <div className="input-group mb-3">
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">General Items</th>
              </tr>
            </thead>
            <tbody>
              {generalItems.map((item) => {
                return (
                  <tr>
                    <th scope="row"></th>
                    <td>{item.name}</td>
                    <td>
                      <button onClick={(e) => addGItem(item)}>Add</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Recommended</th>
            </tr>
          </thead>
          <tbody>
            {conditionalItems.map((item) => {
              return (
                <tr>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={(e) => addCItem(item)}>Add</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
