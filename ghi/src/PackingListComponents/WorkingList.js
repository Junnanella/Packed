import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function WorkingList({items, setItems}){

    function deleteItem(event) {
        for (let index = 0; index < items.length; index ++) {
            if (items[index].name === event.target.value) {
                setItems([...items.filter((_, i) => i !== index)])
            };
        }
    };

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
                                    defaultValue={1}
                                    min={1}
                                />
                            </td>
                            <td>{item.name}</td>
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
