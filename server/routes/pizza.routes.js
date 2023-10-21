const pizzaController = require('../controllers/pizza.controller');

module.exports = (app) => {
    app.post('/api/pizza/create', pizzaController.createPizza);
    app.get('/api/pizzas', pizzaController.listAllPizzas);
    app.get('/api/pizza/:id', pizzaController.getPizzaByID);
    app.put('/api/pizza/update/:id', pizzaController.updatePizza);
    app.delete('/api/pizza/:id', pizzaController.deletePizza);
    app.put('/api/pizza/deliveryStatus/:id', pizzaController.updatePizzaDeliveryStatus);
};