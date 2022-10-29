const express = require('express');
const ContenedorCart = require('../contenedorCart');

const cartsRouter = express.Router();

const contenedor = new ContenedorCart('carts.txt');

cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await contenedor.getAll();
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send('Error');
    }
})

cartsRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cart = await contenedor.getById(id);

    if (cart) {
        res.json({
            message: 'Producto Encontrado',
            content: cart
        })
    } else {
        res.json({
            message: 'Carrito no encontrado'
        })
    }
})

cartsRouter.post('/', async (req, res) => {
    const cart = req.body;
    const carts = await contenedor.save(cart);
    res.json({
        message: 'Creado',
        response: carts
    })
})

cartsRouter.post('/:id/productos', async (req, res) => {

    //Id del carro
    const id = parseInt(req.params.id);
    const idProduct = parseInt(req.body.id);

    const carro = await contenedor.addProductoCarro(id, idProduct)

    res.json({
        message: 'Producto Agregado',
        carro
    })
})

cartsRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const info = req.body;

    const cartsActualizados = await contenedor.updateById(id, info);
    res.json({
        message: `El producto con el id ${id} fue actualizado`,
        response: cartsActualizados
    })
})

cartsRouter.delete('/:id/productos/:id_prods', async (req, res) => {
    const id = parseInt(req.params.id);
    const id_prods = parseInt(req.params.id_prods);

    const carts = await contenedor.deleteProductById(id, id_prods);
    res.json({
        carts
    })
})

cartsRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const carts = await contenedor.getAll();
    if (carts.find(e => e.id === id)) {
        const cart = await contenedor.deleteById(id);
        res.send(cart)
    }
    else {
        res.send('id no encontrado')
    }
    //


})

module.exports = cartsRouter
