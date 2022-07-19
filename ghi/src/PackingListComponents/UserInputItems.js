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
          placeholder="Add an Item"
          required
          type="text"
          name="user_item"
          id="user_item"
          className="form-control"
        />
        <button className="btn" type="button" onClick={onClick}>
          ✅
        </button>
      </div>
    </div>
  );
};
