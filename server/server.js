const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./mongoose.config');
const pizzaRoutes = require('./routes/pizza.routes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

pizzaRoutes(app); // Pass the app object to the routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});