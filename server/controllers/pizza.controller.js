const Pizza = require('../models/pizza.model');

module.exports.createPizza = async (req, res) => {
    try {
        const newPizza = new Pizza(req.body);
        const savePizza = await newPizza.save();
        res.status(201).json(savePizza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.listAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.getPizzaByID = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ error: 'Pizza not found' });
        }
        res.status(200).json(pizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.updatePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!pizza) {
            return res.status(404).json({ error: 'Pizza not found' });
        }

        res.status(200).json(pizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.deletePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndRemove(req.params.id);

        if (!pizza) {
            return res.status(404).json({ error: 'Pizza not found' });
        }

        res.status(204).end(); // Respond with a 204 No Content status
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.updatePizzaDeliveryStatus  = async (req, res) => {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    try {
        // Find the pizza by ID
        const pizza = await Pizza.findById(id);

        if (!pizza) {
            return res.status(404).json({ error: 'Pizza not found' });
        }

        // Update the delivery status
        pizza.deliveryStatus = deliveryStatus;

        // Save the updated pizza
        const updatedPizza = await pizza.save();

        res.json(updatedPizza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




