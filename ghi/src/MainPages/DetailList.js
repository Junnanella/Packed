import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { UserItemForm } from "../PackingListComponents/UserInputItems";

// create a table with editing stuff invisible. if they press edit, d-none toggles
// the view will delete all PackingListItems and then replace them with the new ones

function DetailList() {
    const location = useLocation()
    const packingListId = location.state.id;
    const { authTokens } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [packingList, setPackingList] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [sentData, setSentData] = useState(false)
    const packingListUrl = `http://localhost:8005/api/packing_lists/${packingListId}/`;
    const itemsUrl = `http://localhost:8005/api/packing_lists/${packingListId}/items/`;

    async function fetchData(url, body=null, method="GET") {
        const fetchConfig = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens?.access),
            }
        };
        if (body) {
            fetchConfig.body = JSON.stringify(body);
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            return await response.json();

        } else if (response.statusText === "Unauthorized") {
            alert("You must login to perform this action")
            console.error(response.status);
        } else {
            console.error(response.status);
            alert("Failed operation")
        }
    }

    function findItem(name) {
        for (let index = 0; index < items.length; index ++) {
            if (items[index].name === name) {
                return index
            }
        }
        return "item not found!"
    }

    function deleteItem(event) {
        const name = event.target.value
        const item_index = findItem(name)
        setItems([...items.filter((_, i) => i !== item_index)])
    };

    async function sendChangesToDatabase() {
        const updatedItems = await fetchData(itemsUrl, {items: items}, "PUT")
        if (updatedItems) {
            setEditMode(!editMode);
            makeRequests();
            
        } else {
            console.log("something went wrong")
        }
    }

    const makeRequests = async () => {
        const packingListData = await fetchData(packingListUrl);
        
        if (packingListData) {
            const itemsObject = await fetchData(itemsUrl);
            if (itemsObject) {
                const listOfItems = itemsObject.items
                listOfItems.map(item => {
                    item.name = item.item_name.name;
                    item.suggested = item.item_name.suggested;
                    delete item.item_name;
                })
                const options = {
                    weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                }
                setDepartureDate(new Date(packingListData.departure_date).toLocaleDateString("en-US", options));
                setReturnDate(new Date(packingListData.return_date).toLocaleDateString("en-US", options));
                setPackingList(packingListData);
                setItems(listOfItems);
            }
        }
    }

    useEffect(() => {
            makeRequests()
    }, [sentData,])

    return(
        <div className="container mt-3">
            <div className="col-6 offset-3">
                <h1>{packingList.title}</h1>
                <p>{departureDate} - {returnDate}</p>
                {editMode ?
                    <button className="btn btn-success" onClick={sendChangesToDatabase}>Save changes</button>
                :
                    <button className="btn btn-success" onClick={()=>setEditMode(!editMode)}>Edit</button>
                }
                    {editMode ?
                        <UserItemForm
                            setItems={setItems}
                            items={items}
                        />
                    :
                        null
                    }
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" style={{width: "90px"}}>QTY</th>
                            <th className="text-center">{items.length === 1 ? 'Item' : "Items"}</th>
                            <th className="text-center" style={{width: "90px"}}>Packed</th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item.name}>
                                    <td className="text-center">
                                        { !editMode ?
                                            item.quantity
                                        :
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
                                        }
                                    </td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            defaultChecked={item.packed}
                                            value={item.packed}
                                            disabled={!editMode ? true : false}
                                            onChange={(e) =>{
                                                const newItems = [...items];
                                                const index = findItem(item.name)
                                                newItems[index].packed = e.target.value === "true" ? false : true;
                                                setItems(newItems);
                                            }}
                                        />
                                    </td>
                                    {editMode ?
                                        <td className="text-center" style={{width: "90px"}}>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={deleteItem}
                                                value={item.name}
                                            >
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </td>
                                    :
                                        null
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailList
