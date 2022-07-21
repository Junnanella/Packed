import React, { useState, useEffect } from "react";

function WorkingList(props){
    // const items = props.items;
    // console.log(items);
    
    // const [items, setItems] = useState([props.items])
    // useEffect(() => {
    //     async function getItems() {
    //         setItems(props.items)
    //     }
    //     getItems();
    //     console.log(items)
    // }, [props.setItems, props.items])
    function deleteItem(event) {
        const temp_items = props.items;
        for (let i = 0; i < temp_items.length; i ++) {
            if (temp_items[i].name === event.target.value) {
                const new_items = i < temp_items.length - 1 ?
                temp_items.slice(0, i) + temp_items.slice(i + 1) :
                temp_items.slice(0, i);
                props.setItems(new_items)
            };
        };
    };

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{width: "20%"}}>Quantity</th>
                        <th>Item</th>
                        <th style={{width: "20%"}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map(item => {
                        return (<tr key={item.name}>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={1}
                                    min={1}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={deleteItem}
                                    value={item.name}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </>
    );
};

export default WorkingList;
