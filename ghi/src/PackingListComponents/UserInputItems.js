import React, { useState } from "react";

export const UserItemForm = ({items, setItems}) => {
  const [userItem, setUserItem] = useState("");

  const onClick = async (event) => {
    let valid = true
    for (let item of items){
      if (item.name.toLowerCase() === userItem.toLowerCase()) {
        valid = false
      }
    }
    if (valid) {
      setItems([...items, {
        "name": userItem,
        "suggested": false,
      }]);
    } else {
      alert("This item is already on your list!")
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
          Add
        </button>
      </div>
    </div>
  );
};
