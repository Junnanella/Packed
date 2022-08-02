import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

// create a table with editing stuff invisible. if they press edit, d-none toggles
// the view will delete all PackingListItems and then replace them with the new ones

function DetailList() {
    const to_be_id = 5;
    const { authTokens } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [packingList, setPackingList] = useState({});

    async function sendData(url) {
        const fetchConfig = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens?.access),
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            return await response.json();

        } else if (response.statusText === "Unauthorized") {
            alert("You must login to view your packing lists")
            console.error(response.status);
        } else {
            console.error(response.status);
            alert("Failed to fetch packing list")
        }
    }

    useEffect(() => {
        const packingListUrl = `http://localhost:8005/api/packing_lists/${to_be_id}/`;
        const itemsUrl = `http://localhost:8005/api/packing_lists/${to_be_id}/items/`;

        const makeRequests = async () => {
            const packingListData = await sendData(packingListUrl);
            
            if (packingListData) {
                const itemsData = await sendData(itemsUrl);
                if (itemsData) {
                    console.log(itemsData.items)
                    setPackingList(packingListData);
                    setItems(itemsData.items);
                }
            }
        }
        makeRequests()
    }, [])

    return(
        <div className="container mt-3">
            <div className="col-6 offset-3">
                <h1>{packingList.title}</h1>
                <p>{packingList.departure_date} - {packingList.return_date}</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" style={{width: "90px"}}>QTY</th>
                            <th className="text-center">{items.length === 1 ? 'Item' : "Items"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">{item.item_name.name}</td>
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
