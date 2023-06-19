const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require("./db");

const Pizza = require('./models/pizzaModel');
app.use(express.json());

const pizzaRoute = require('./routes/pizzaRoute');
const userRoute=require('./routes/userRoute')
const ordersRoute=require('./routes/ordersRoute')

app.use('/api/pizzas/',pizzaRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/',ordersRoute)


app.get('/', (req, res) => {
  res.send('Hello, world!');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
