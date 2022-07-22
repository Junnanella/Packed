function WorkingList({items, setItems}){

    function deleteItem(event) {
        for (let index = 0; index < items.length; index ++) {
            if (items[index].name === event.target.value) {
                setItems([...items.filter((_, i) => i !== index)])
            };
        }
    };

    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th style={{width: "10%"}}>Quantity</th>
                    <th>Item</th>
                    <th style={{width: "20%"}}>Delete</th>
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
                                Delete
                            </button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    );
};

export default WorkingList;
