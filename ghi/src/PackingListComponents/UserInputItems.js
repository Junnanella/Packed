import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const UserItemForm = ({items, setItems}) => {
  const [userItem, setUserItem] = useState("");

  const onClick = async (event) => {
    let valid = true
    let message = ""
    if (userItem === "") {
      message = "Nothing isn't something you can pack!"
      valid = false
    }
    for (let item of items){
      if (item.name.toLowerCase() === userItem.toLowerCase()) {
        message = "This item is already on your list!"
        valid = false
      }
    }
    if (valid) {
      setItems([...items, {
        "name": userItem,
        "suggested": false,
      }]);
    } else {
      alert(message)
    }
    setUserItem("");
  };


  const onChangeUserItem = (event) => {
    setUserItem(() => event.target.value);
  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          onChange={onChangeUserItem}
          value={userItem}
          placeholder="Item Name"
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
