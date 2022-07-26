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

  // console.log("conditionalItems", conditionalItems);
  // console.log("generalItems", generalItems);


  // add onclick with set items in travel detail page , reference user input items 
  const Add = () => {
    return (
      <div className="add">
        <button>Add</button>
      </div>
    )
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
            {generalItems.map(item => { 
             return (<tr>
                    <th scope="row"></th>
                    <td>{item.name}</td>
                  </tr>)
              })
            }
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
              {conditionalItems.map(item => { 
             return (<tr>
                    <th scope="row"></th>
                    <td>{item.name}</td>
                  </tr>)
              })
            }
            </tbody>
      </table>
      </div>
    </div>
  );
}
