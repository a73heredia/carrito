const fs = require('fs');
const Contenedor = require('./contenedorProductos');
const producto = new Contenedor('productos.txt');

class ContenedorCart {
    constructor(nameFile) {
        this.nameFile = nameFile
    }
    async save(cart) {
        try {
            //leer si el carrito existe
            if (fs.existsSync(this.nameFile)) {
                const carts = await this.getAll();
                const lastIdAdded = carts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0);
                const newCart = {
                    id: lastIdAdded + 1,
                    ...cart,
                    productos: []
                }
                carts.push(newCart);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(carts, null, 2))
                return carts;
            } else {
                const newCart = {
                    ...cart,
                    id: 1
                }
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newCart], 2, null))
            }

        } catch (error) {
            console.log(error)
        }
    }

    getById = async (id) => {
        try {
            if (fs.existsSync(this.nameFile)) {
                const carts = await this.getAll();
                const cart = carts.find(item => item.id === id);
                return cart
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async () => {
        try {
            const contenido = await fs.promises.readFile(this.nameFile, "utf8");
            const carts = JSON.parse(contenido);
            return carts
        } catch (error) {
            console.log(error)
        }
    }


    addProductoCarro = async (id, idProductoCarro) => {

        try {
            //verificar que le id del carro exista 
            const cart = await this.getById(id)
            const carts = await this.getAll();
            //id del producto existe
            const cartPos = carts.findIndex(elm => elm.id === id);
            const productoBuscado = await producto.getById(idProductoCarro);
            //agregar producto al array de productos 

            cart.productos.push(productoBuscado);
            carts[cartPos] = cart;
            fs.promises.writeFile(this.nameFile, JSON.stringify(carts, null, 2));

            return cart
        } catch (error) {
            console.log(error)
        }

    }

    deleteById = async (id) => {
        try {
            const carts = await this.getAll();
            const newCarts = carts.filter(item => item.id !== id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newCarts, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }

    updateById = async (id, body) => {
        try {
            const carts = await this.getAll();
            const cartPos = carts.findIndex(elm => elm.id === id);
            productos[cartPos] = {
                id: id,
                ...body
            };
            await fs.promises.writeFile(this.nameFile, JSON.stringify(carts, null, 2))
            return carts;
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductById = async (id, id_prod) => {
        try {
            const carts = await this.getAll();
            const cart = await this.getById(id);

            //si el producto existe
            const productoGet = await producto.getById(id_prod);

            //si el producto existe dentro del carro
            const productoIndex = cart.productos.find(item => item.id === productoGet.id || null)
            //Borrar producto del carro   
            cart.productos.splice(productoIndex, 1)

            //Sobreescribimos la posicion del carro
            const cartPos = carts.findIndex(elm => elm.id === id);
            carts[cartPos] = cart;

            await fs.promises.writeFile(this.nameFile, JSON.stringify(carts, null, 2))

            return cart
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ContenedorCart