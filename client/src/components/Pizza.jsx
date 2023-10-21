import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Pizza() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        pizzaType: 'Pepperoni',
        size: 'Single',
        deliveryDate: '',
        specialInstructions: '',
    });

    // State variables for error messages
    const [noteError, setNoteError] = useState('');
    const [dateError, setDateError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOrderNow = () => {
        // Reset error messages
        setNoteError('');
        setDateError('');

        if (formData.specialInstructions.length > 25) {
            setNoteError('Notes must be a maximum of 25 characters');
            return;
        } else {
            setNoteError(''); // Clear any previous error
        }

        if (!formData.deliveryDate) {
            setDateError('Please select a date');
            return;
        }

        // Assuming you have an API endpoint to send the order data
        fetch('http://localhost:3001/api/pizza/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success (e.g., show a success message or navigate to another page)
                navigate('/'); // Redirect to the home page
            })
            .catch((error) => {
                // Handle error (e.g., display an error message)
                console.error('Failed to place the order', error);
            });
    };

    return (
        <div className="container main-div">
            <div className="heading-two">
                <h5>{formData.size} {formData.pizzaType}</h5>
                <div>
                    <Link to="/">Go to home</Link>
                </div>
            </div>
            <div className="d-flex justify-content-between selector-display">
                <div>
                    <h6>Pizza</h6>
                    <select
                        name="pizzaType"
                        value={formData.pizzaType}
                        onChange={handleInputChange}
                    >
                        <option value="Pepperoni">Pepperoni</option>
                        <option value="Cheese">Cheese</option>
                        <option value="Combination">Combination</option>
                        <option value="Philly Cheese Steak">Philly Cheese Steak</option>
                        <option value="Hawaiian">Hawaiian</option>
                        <option value="Veggie">Veggie</option>
                    </select>
                </div>
                <div>
                    <h6>Size</h6>
                    <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                    >
                        <option value="Single">Single</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
            </div>
            <p>
                Note:
                <span style={{ color: 'red' }}>{noteError}</span>
            </p>
            <div className="d-flex justify-content-between input-section">
                <div>
                    <textarea
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <div>
                    <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                    />
                    <span style={{ color: 'red' }}>{dateError}</span>
                    <button onClick={handleOrderNow}>Order Now</button>
                </div>
            </div>
        </div>
    );
}

export default Pizza;
