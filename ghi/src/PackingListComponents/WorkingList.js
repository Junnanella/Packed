import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkingList({
    items,
    setItems,
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

    // function setQuantity(name, quantity) {
    //     const item_index = findItem(name)
    //     setItems([...items], items[item_index].quantity = 2)
    //     console.log("hi", quantity) 
    // }
    function setQuantity(event) {
        console.log(event.target.value)
    }

    return (
        <div className="">
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
                                    // onChange={setQuantity}
                                    // onChange={setQuantity(item.name, item.quantity)}
                                    // value={item.quantity}
                                    defaultValue={item.quantity}
                                    min={1}
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
        </div>
    );
};

export default WorkingList;
