import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkingList({
    items,
    setItems,
    destination_country,
}){
      
    function findItem(name) {
        for (let index = 0; index < items.length; index ++) {
            if (items[index].name === name) {
                return index
            }
        }
        return "item not found!"
    }

    function deleteItem(event) {
        const item_index = findItem(event.target.value)
        setItems([...items.filter((_, i) => i !== item_index)])
    };

    function sendData() {
        if (items.length > 0) {
            console.log({"items to be sent to the backend": items})
        } else {
            console.log("you cant create an empty packing list")
        }
    }


    return (
        <div className="">
            <h3>Packing List for {destination_country}</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center" style={{width: "90px"}}>QTY</th>
                        <th className="text-center">{items.length === 1 ? 'Item' : "Items"}</th>
                        <th className="text-center" style={{width: "10%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        return (<tr key={item.name}>
                            <td>
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
                            </td>
                            <td>{item.suggested ? item.name + " (suggested)" : item.name}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={deleteItem}
                                    value={item.name}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div>
                <button className="btn btn-success" onClick={sendData}>Create!</button>
            </div>
        </div>
    );
};

export default WorkingList;
