import "./pages.css";
import { Modal } from "react-bootstrap";
import AuthContext from '../context/AuthContext';
import CurrencyInfo from '../DataCharts/CurrencyInfo';
import WeatherChart from "../DataCharts/WeatherChart";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useContext, useCallback } from 'react';
import { UserItemForm } from "../PackingListComponents/UserInputItems";
import ReactRouterPrompt from "react-router-prompt"
function getLocaleDates(date) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-us", options)
}
function DetailList() {
    const navigate = useNavigate();
    const location = useLocation();
    const packingList = location.state.packingList
    const packingListId = packingList.id;
    const packingListTitle = packingList.title;
    const cityWeather = packingList.destination_city;
    const countryWeather = packingList.destination_country;
    const departureDate = packingList.departure_date;
    const returnDate = packingList.departure_date;
    const originCountry = packingList.origin_country;
    const createdDate = packingList.created;
    const { authTokens } = useContext(AuthContext);
    const [mount, setMount] = useState(true);
    const [items, setItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [percentagePacked, setPercentagePacked] = useState(0);
    const [progressBarColor, setProgressBarColor] = useState(
        "progress-bar-striped bg-warning progress-bar-animated"
    )
    const itemsUrl = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/${packingListId}/items/`;
    const packingListUrl = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/${packingListId}/`;
    // function that handles making GET, PUT and DELETE methods to the backend
    // arguments: url:str, method:str, body:str
    // returns: an object with the response data from the backend
    const fetchData = useCallback(async (url, method = "GET", body = null) => {
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
    }, [authTokens?.access])
    // helper function to find item in items
    // argument: name:str
    // returns: index of item:int
    function findItem(name) {
        for (let index = 0; index < items.length; index++) {
            if (items[index].name === name) {
                return index;
            }
        }
        return "item not found!";
    }
    function printPackingList() {
        window.print();
    }
    // helper function to delete an item from items
    // argument: event - contains the name of the sought item
    function deleteItem(event) {
        event.preventDefault();
        const name = event.target.value;
        const item_index = findItem(name);
        const updatedItems = [...items.filter((_, i) => i !== item_index)];
        setItems(updatedItems);
        percentage(updatedItems);
    };
    // function that structures the DELETE request to be sent to the backend
    // reroutes to packing lists page
    async function deletePackingList(event) {
        event.preventDefault();
        if (await fetchData(packingListUrl, "DELETE", null) !== null) {
            navigate("/packinglists");
        }
    }
    // function that structures the PUT request to be sent to the backend
    // updates state with new data
    async function sendChangesToDatabase() {
        const updatedItems = await fetchData(itemsUrl, "PUT", { items: items })
        if (updatedItems) {
            setEditMode(!editMode);
            makeRequests();
        } else {
            window.alert("Something went wrong. Try again.")
        }
    }
    // sets the percentage packed. this info is used to update the progress bar
    // arguments: items fetched from the database or the already existing items
    // sets the percentage packed and the color of the progress bar
    const percentage = useCallback((fetchedItems = null) => {
        const data = !fetchedItems ? items : fetchedItems;
        const numItems = data.length
        const numPackedItems = data.filter(item => {
            return item.packed === true
        }).length
        const calculatedPercentage = Math.floor((numPackedItems / numItems) * 100);
        setPercentagePacked(numItems > 0 ? calculatedPercentage : 0);
        if (calculatedPercentage === 100) {
            setProgressBarColor("bg-success");
        } else {
            setProgressBarColor("progress-bar-striped bg-warning progress-bar-animated");
        }
    }, [items])
    // function used to clean the PackingListItems from the backend and turn
    // them into valid Item instances
    const makeRequests = useCallback(async () => {
        const itemsObject = await fetchData(itemsUrl);
        if (itemsObject) {
            const listOfItems = itemsObject.items;
            listOfItems.map(item => {
                item.name = item.item_name.name;
                item.suggested = item.item_name.suggested;
                delete item.item_name;
                return null;
            })
            setItems(listOfItems);
            percentage(listOfItems);
        }
    }, [fetchData, percentage, itemsUrl])
    useEffect(() => {
        if (mount) {
            makeRequests();
            setMount(false);
        }
    }, [mount, fetchData, makeRequests])
    return (
        <div className="container mt-3">
            <ReactRouterPrompt when={editMode}>
                {({ isActive, onConfirm, onCancel }) => (
                    <Modal className="popup1" show={isActive}>
                        <div>
                            <p>Are you sure you want to leave your unsaved changes?</p>
                            <button onClick={onCancel}>Cancel</button>
                            <button onClick={onConfirm}>Ok</button>
                        </div>
                    </Modal>
                )}
            </ReactRouterPrompt>
            <div className="col-10 offset-1 shadow p-4 rcorners1">
                <div className="row">
                    <div style={{ width: "70%" }}>
                        <div>
                            {getLocaleDates(departureDate)} - {getLocaleDates(returnDate)}
                        </div>
                        <h2 className="p-1 col">{packingListTitle}</h2>
                        {editMode ?
                            <UserItemForm
                                setItems={setItems}
                                items={items}
                                percentagePacked={percentagePacked}
                                setPercentagePacked={setPercentagePacked}
                                setProgressBarColor={setProgressBarColor}
                            />
                            :
                            <div className="mb-2 text-left">
                                <CurrencyInfo
                                    origin_country={originCountry}
                                    destination_country={countryWeather}
                                    detailPage={true}
                                />
                            </div>
                        }
                    </div>
                    <div className="col">
                        <WeatherChart
                            destination_city={cityWeather}
                            destination_country={countryWeather}
                            departure_date={departureDate}
                            return_date={returnDate}
                            detail={true}
                        />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <div className="progress m-3">
                            <div
                                className={`progress-bar ${progressBarColor}`}
                                role="progressbar" style={{ width: `${percentagePacked}%` }}
                                aria-valuenow={percentagePacked}
                                aria-valuemin="0" aria-valuemax="100"
                            />
                        </div>
                    </div>
                    <div className="col-2 m-1">
                        {editMode ?
                            <button
                                className="btn btn-success btn-sm2"
                                onClick={sendChangesToDatabase}
                                data-hover="Save changes"
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            :
                            <button
                                className="btn btn-outline-success btn-sm2"
                                onClick={() => {
                                    setEditMode(!editMode)
                                }}
                                data-hover="Edit items"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        }
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "90px" }}>QTY</th>
                            <th className="text-center">{items.length === 1 ? 'Item' : "Items"}</th>
                            <th className="text-center" style={{ width: "90px" }}>Packed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item.name}>
                                    <td className="text-center">
                                        {!editMode ?
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
                                                min={1} max={1000}
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
                                            onChange={(e) => {
                                                const newItems = [...items];
                                                const index = findItem(item.name)
                                                newItems[index].packed = e.target.value === "true" ? false : true;
                                                setItems(newItems);
                                                percentage()
                                            }}
                                        />
                                    </td>
                                    {editMode ?
                                        <td className="text-center" style={{ width: "90px" }}>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={deleteItem}
                                                value={item.name}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
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
                <div className="row">
                    {editMode ?
                        <div className="col">
                            <button
                                className="btn btn-sm btn-danger btn-sm3"
                                onClick={deletePackingList}
                                data-hover="Delete packing list"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        :
                        <div className="col">
                            <button
                                className="btn btn-sm btn-success btn-sm3"
                                onClick={printPackingList}
                                data-hover="Print"
                            >
                                <FontAwesomeIcon icon={faPrint} />
                            </button>
                        </div>
                    }
                    <div className="col" style={{ textAlign: "right" }}>Created on {getLocaleDates(createdDate)}.</div>
                </div>
            </div>
        </div>
    )
}
export default DetailList
