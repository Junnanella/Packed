import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const UserItemForm = ({
  items,
  setItems,
  percentagePacked = null,
  setPercentagePacked = null,
  setProgressBarColor = null,
}) => {
  const [userItem, setUserItem] = useState("");

  // when a user submits a new item, this function cleans the
  // entry to make sure it is not blank and that there is not
  // an existing item with that name
  // if data is valid, this function adds the new item to items
  const onClick = async (event) => {
    let valid = true;
    let message = "";
    if (userItem === "") {
      message = "Nothing isn't something you can pack!";
      valid = false;
    }
    for (let item of items) {
      if (item.name.toLowerCase() === userItem.toLowerCase()) {
        message = "This item is already on your list!";
        valid = false;
      }
    }
    if (valid) {
      const updatedItems = [
        ...items,
        {
          name: userItem,
          suggested: false,
          quantity: 1,
          id: null,
        },
      ];
      setItems(updatedItems);
      // this if statement is used by the DetailList page. It ensures the packing
      // progress bar is updated correctly when a user adds an item
      if (percentagePacked) {
        const numItems = updatedItems.length;
        const numPackedItems = updatedItems.filter((item) => {
          return item.packed;
        }).length;
        const newPercentage = Math.floor((numPackedItems / numItems) * 100)
        setPercentagePacked(newPercentage);
        if (newPercentage === 100 && numItems > 0) {
          setProgressBarColor("bg-success");
        } else {
          setProgressBarColor("progress-bar-striped bg-warning progress-bar-animated");
        }
      }
    } else {
      alert(message);
    }
    setUserItem("");
  };

  const onChangeUserItem = (event) => {
    setUserItem(() => event.target.value);
  };

  return (
    <div className="container">
      {percentagePacked === null ? (
        <h3 className="add-items-heading">Add Item</h3>
      ) : null}
      <div className="input-group mb-3">
        <input
          onChange={onChangeUserItem}
          value={userItem}
          placeholder="New Item"
          required
          type="text"
          name="user_item"
          id="user_item"
          className="form-control"
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};
