import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { UserItemForm } from "../PackingListComponents/UserInputItems";
import WeatherChart from "../DataCharts/WeatherChart";

// create a table with editing stuff invisible. if they press edit, d-none toggles
// the view will delete all PackingListItems and then replace them with the new ones

function DetailList() {
    const location = useLocation();
    const packingListId = location.state.packingList.id;
    const cityWeather = location.state.packingList.destination_city;
    const countryWeather = location.state.packingList.destination_country;
    const departuredDateWeather = location.state.packingList.departure_date;
    const returnDateWeather = location.state.packingList.departure_date;
    const { authTokens } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [packingList, setPackingList] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const[percentagePacked, setPercentagePacked] = useState(0);
    const [progressBarColor, setProgressBarColor] = useState("progress-bar-striped bg-warning progress-bar-animated")

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
                return index;
            }
        }
        return "item not found!";
    }

    function deleteItem(event) {
        const name = event.target.value;
        const item_index = findItem(name);
        const updatedItems = [...items.filter((_, i) => i !== item_index)];
        setItems(updatedItems);
        percentage(updatedItems);
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

    function percentage(fetchedItems=null) {
        const data = !fetchedItems ? items : fetchedItems;
        const numItems = data.length
        const numPackedItems = data.filter(item => {
            return item.packed === true
        }).length
        const calculatedPercentage = Math.floor((numPackedItems / numItems) * 100);
        setPercentagePacked(calculatedPercentage);
        if (calculatedPercentage === 100) {
            setProgressBarColor("bg-success");
        } else {
            setProgressBarColor("progress-bar-striped bg-warning progress-bar-animated");
        }
    }

    const makeRequests = async () => {
        const packingListData = await fetchData(packingListUrl);
        
        if (packingListData) {
            const itemsObject = await fetchData(itemsUrl);
            if (itemsObject) {
                const listOfItems = itemsObject.items;
                listOfItems.map(item => {
                    item.name = item.item_name.name;
                    item.suggested = item.item_name.suggested;
                    delete item.item_name;
                })
                const options = {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                };
                setDepartureDate(new Date(packingListData.departure_date).toLocaleDateString("en-US", options));
                setReturnDate(new Date(packingListData.return_date).toLocaleDateString("en-US", options));
                setPackingList(packingListData);
                setItems(listOfItems);
                percentage(listOfItems);
            }
        }
    }

    useEffect(() => {
        async function populatePage() {
            await makeRequests();
        }
        populatePage();
    }, [])

    return(
        <div className="container mt-3">
            <div className="col-10 offset-1 shadow rounded p-4">
                <div className="row">
                    <div style={{width: "70%"}}>
                        <p>{departureDate} - {returnDate}</p>
                        <div className="input-group">
                            <div className="p-1">
                                {editMode ?
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={sendChangesToDatabase}
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                    </button>
                                :
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={()=>setEditMode(!editMode)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                }
                            </div>
                            <h3 className="p-1">{packingList.title}</h3>
                        </div>
                        {editMode ?
                            <UserItemForm
                                setItems={setItems}
                                items={items}
                                percentagePacked={percentagePacked}
                                setPercentagePacked={setPercentagePacked}
                            />
                        :
                            null
                        }
                    </div>
                    <div className="col">
                        <WeatherChart
                            destination_city={cityWeather}
                            destination_country={countryWeather}
                            departure_date={departuredDateWeather}
                            return_date={returnDateWeather}
                            detail={true}
                        />
                    </div>
                </div>

                <div className="progress m-3">
                     <div
                        className={`progress-bar ${progressBarColor}`}
                        role="progressbar" style={{width: `${percentagePacked}%`}}
                        aria-valuenow={percentagePacked}
                        aria-valuemin="0" aria-valuemax="100"
                    />
                </div>
                <table className="table table-striped table-bordered">
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
                                                percentage()
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
