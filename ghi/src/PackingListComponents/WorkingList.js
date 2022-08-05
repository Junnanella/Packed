import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function WorkingList({
  items,
  setItems,
  destination_city,
  destination_country,
  departure_date,
  return_date,
  origin_country,
}) {
  let { authTokens } = useContext(AuthContext);
  let navigate = useNavigate();
  const [editMode, setEditMode] = useState(false)

  function printPage() {
    window.print();
  }

  function findItem(name) {
    for (let index = 0; index < items.length; index++) {
      if (items[index].name === name) {
        return index;
      }
    }
    return "item not found!";
  }

  function deleteItem(event) {
    const item_index = findItem(event.target.value);
    setItems([...items.filter((_, i) => i !== item_index)]);
  }

  async function sendData(data, url) {
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const listData = await response.json();
      return listData;
    } else if (response.statusText === "Unauthorized") {
      alert("You must login to create a list");
      console.error(response.status);
    } else {
      console.error(response.status);
      alert("Failed to create packing list");
    }
  }

  async function createList() {
    if (items.length > 0) {
      const paragraph = document.getElementById("edit").innerHTML;
      const packingListData = {
        title: paragraph,
        departure_date: departure_date,
        return_date: return_date,
        destination_city: destination_city,
        destination_country: destination_country,
        origin_country: origin_country,
      };
      const packingListUrl = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/`;
      const packingList = await sendData(packingListData, packingListUrl);
      if (packingList) {
        const itemsData = { items: items };
        const itemsUrl = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/${packingList.id}/items/`;
        await sendData(itemsData, itemsUrl);
        navigate("/packing_list", { state: { packingList: packingList } });
      } else {
        window.alert("Unsuccessful creation of packing list. Try again.")
      }
    } else {
      window.alert("you cant create an empty packing list");
    }
  }

  // editing/saving packing list name on travel detail page
  const paragraph = document.getElementById("edit");
  const edit_button = document.getElementById("edit-button");
  const end_button = document.getElementById("end-editing");

  edit_button?.addEventListener("click", function () {
    paragraph.contentEditable = true;
    paragraph.style.backgroundColor = "#dddbdb";
    setEditMode(true);
  });

  end_button?.addEventListener("click", function () {
    paragraph.contentEditable = false;
    paragraph.style.backgroundColor = "transparent";
    setEditMode(false);
  });

  return (
    <div className="">
      <div id="container">
        <h3 id="edit" name="title" className="packing-list-heading">
          Packing List for {destination_country}
        </h3>
        {editMode ?
          <button
            className="btn btn-success btn-sm1 btn-sm"
            type="submit"
            id="end-editing"
            data-hover="Save"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          :
          <button
            className="btn btn-outline-success btn-sm1 btn-sm me-1"
            type="submit"
            id="edit-button"
            data-hover="Edit Name"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        }
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "90px" }}>
              QTY
            </th>
            <th className="text-center">
              {items.length === 1 ? "Item" : "Items"}
            </th>
            <th className="text-center" style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.name}>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    onChange={(event) => {
                      const newItems = [...items];
                      const index = findItem(item.name);
                      newItems[index].quantity = event.target.value;
                      setItems(newItems);
                    }}
                    defaultValue={item.quantity}
                    min={1}
                    max={1000}
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={deleteItem}
                    value={item.name}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {authTokens ? (
          <button className="btn btn-success" onClick={createList}>
            Create!
          </button>
        ) : (
          <button className="btn btn-success" onClick={printPage}>
            Save as PDF!
          </button>
        )}
      </div>
    </div>
  );
}

export default WorkingList;
