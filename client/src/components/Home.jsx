import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [pizzas, setPizzas] = useState([]);
    const [showDelivered, setShowDelivered] = useState(true);

    useEffect(() => {
        // Fetch pizzas when the component mounts
        fetchPizzas();
    }, []);

    const fetchPizzas = () => {
        fetch('http://localhost:3001/api/pizzas')
            .then(response => response.json())
            .then(data => setPizzas(data))
            .catch(error => console.error('Failed to fetch pizzas', error));
    };

    const handleDeliveryStatusChange = (id, currentStatus) => {
        // Toggle the delivery status
        const updatedPizzas = pizzas.map(pizza => {
            if (pizza._id === id) {
                pizza.deliveryStatus = !currentStatus;
            }
            return pizza;
        });

        // Update the pizza on the server
        fetch(`http://localhost:3001/api/pizza/deliveryStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deliveryStatus: !currentStatus }),
        })
            .then(response => response.json())
            .then(() => {
                // Refresh the component with the updated data
                setPizzas(updatedPizzas);
            })
            .catch(error => console.error('Failed to update pizza', error));
    };

    const handleRemovePizza = (id) => {
        // Send a DELETE request to remove the pizza from the server
        fetch(`http://localhost:3001/api/pizza/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Remove the deleted pizza from the list
                const updatedPizzas = pizzas.filter(pizza => pizza._id !== id);
                setPizzas(updatedPizzas); // Update the state to trigger a re-render
            })
            .catch(error => console.error('Failed to remove pizza', error));
    };

    const filteredPizzas = showDelivered ? pizzas : pizzas.filter(pizza => !pizza.deliveryStatus);

    return (
        <div className="container main-div">
            <div className="heading-one">
                <h1>Pizza Order</h1>
                <button onClick={() => navigate('/new')}>Order Pizza</button>
            </div>
            <div className="action-bar">
                <p>Find stores in your area</p>
                <div>
                    <button onClick={() => setShowDelivered(true)}>Show Delivered Pizza</button>
                    <button onClick={() => setShowDelivered(false)}>Hide Delivered Pizza</button>
                </div>
            </div>
            <div className="table-holder">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Created At</th>
                        <th scope="col">Pizza</th>
                        <th scope="col">Size</th>
                        <th scope="col">Delivered</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPizzas.map((pizza) => (
                        <tr key={pizza._id}>
                            <td>{pizza.createdAt}</td>
                            <td>{pizza.pizzaType}</td>
                            <td>{pizza.size}</td>
                            <td>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={pizza.deliveryStatus}
                                        onChange={() => handleDeliveryStatusChange(pizza._id, pizza.deliveryStatus)}
                                    />
                                    {pizza.deliveryStatus ? <p>True</p> : <p>False</p>}
                                </div>
                            </td>
                            <td>
                                <button onClick={() => handleRemovePizza(pizza._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
