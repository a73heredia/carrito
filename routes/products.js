const express = require('express');
const { parse } = require('path');
const Contenedor = require('../contenedorProductos');
const validateRole = require('../middleware/auth.handler')
const productosRouter = express.Router();

const contenedor = new Contenedor('productos.txt');

productosRouter.get('/', async (req, res) => {
    try {
        const products = await contenedor.getAll();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send('Error');
    }
})

productosRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await contenedor.getById(id);

    if (product) {
        res.json({
            message: 'Producto Encontrado',
            content: product
        })
    } else {
        res.json({
            message: 'Producto no encontrado'
        })
    }
})

productosRouter.post('/', validateRole, async (req, res) => {
    const producto = req.body;
    const productos = await contenedor.save(producto);
    res.json({
        message: 'Creado',
        response: productos
    })
})

productosRouter.put('/:id', validateRole, async (req, res) => {
    const id = parseInt(req.params.id);
    const info = req.body;

    const productosActualizados = await contenedor.updateById(id, info);
    res.json({
        message: `El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})

productosRouter.delete('/:id', validateRole, async (req, res) => {
    const id = parseInt(req.params.id);
    const ptos = await contenedor.getAll();
    if (ptos.find(e => e.id === id)) {
        const product = await contenedor.deleteById(id);
        res.send(product)
    }
    else {
        res.send('id no encontrado')
    }
    //


})


module.exports = productosRouter;