import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrash, faSolid } from '@fortawesome/free-solid-svg-icons';

function WorkingList({items, setItems}){

    function deleteItem(event) {
        for (let index = 0; index < items.length; index ++) {
            if (items[index].name === event.target.value) {
                setItems([...items.filter((_, i) => i !== index)])
            };
        }
    };

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="text-center" style={{width: "13%"}}>QTY</th>
                    <th className="text-center">{items.length === 1 ? 'Item' : "Items"}</th>
                    <th className="text-center" style={{width: "10%"}}></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
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
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    );
};

export default WorkingList;
