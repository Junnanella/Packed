import React, { useState } from "react";

export const UserItemForm = (props) => {
  const [userItem, setUserItem] = useState("");

  const onClick = async (event) => {
    console.log(userItem);
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
