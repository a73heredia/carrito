const express = require('express');
const router = require('./routes/products');
const routerCart = require('./routes/carts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', router);
app.use('/api/carrito', routerCart);

app.listen(8080, () => console.log('Server running on 8080'));

