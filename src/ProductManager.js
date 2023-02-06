const fs = require('fs')

const products = []

class ProductManager {
    constructor(path) {
        this.path = path
    }

    idGenerator = () =>{
        const count = products.length
        if (count === 0){
            return 1
        } else {
            return (products[count-1].id) + 1     
        }
    }

    getProducts = () =>{
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        let allProducts = fs.readFileSync(this.path, 'utf-8')
        console.log(JSON.parse(allProducts)) 
    }

    getProductById = ( id ) =>{
        const productById = products.find(e => e.id === id)
        if (productById === undefined){
            return console.error ("Not found.")
        } 
        return console.log(productById)
    }

    addProduct = ( title, description, price, thumbnail, code, stock ) => {
        const id = this.idGenerator()

        if( !title || !description || !price || !thumbnail || !code || !stock ){
            console.error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
            return
        }

        if (products.find(e => e.code === code)){
            console.error(`El producto "${title}" no puede ser agregado porque ya existe un producto con el mismo código.`)
            return
        }

        products.push({         
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
    }

    updateProduct = ( id, title, description, price, thumbnail, code, stock ) =>{
        const product = products.find(e => e.id === id)
        if (product === undefined){
            console.error ("No existe un producto con ese id, no se pudo actualizar.")
            return
        } 

        if( !title || !description || !price || !thumbnail || !code || !stock ){
            console.error('No se pudo actualizar el producto porque no se completaron todos los datos necesarios.')
            return
        }
        
        product.id = id
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
        product.code = code
        product.stock = stock
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        console.log('El producto fue actualizado con éxito.')
    }

    deleteProduct = ( id ) =>{
        const product = products.find(e => e.id === id)
        if (product === undefined){
            return console.error ("No existe un producto con ese id, no se pudo eliminar.")
        } else {
            const productIndex = products.indexOf(product)
            products.splice(productIndex, 1)
            if(products.length === 0){
                fs.unlinkSync(this.path, 'utf-8')
            } else{
                fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
            }
            return console.log(`El producto "${product.title}" fue eliminado.`)
        }
    }
}

const productManager = new ProductManager('products.json')
productManager.addProduct('Samsung Galaxy S23', 'Descripción Samsung Galaxy S23', 1000, 'Samsung-Galaxy-S23.jpg', '001', 25)
productManager.addProduct('Motorola Edge 30', 'Descripción Motorola Edge 30', 900, 'Motorola-Edge-30.jpg', '002', 20)
productManager.addProduct('iPhone 14', 'Descripción iPhone 14', 800, 'iPhone-14.jpg', '003', 22)
productManager.addProduct('Xiaomi Redmi 10', 'Descripción Xiaomi Redmi 10', 700, 'Xiaomi-Redmi-10.jpg', '004', 10)
productManager.addProduct('Huawei P40', 'Descripción Huawei P40', 600, 'Huawei-P40.jpg', '005', 15)
productManager.addProduct('Huawei Mate 10', 'Descripción Huawei Mate 10', 500, 'Huawei-Mate-10.jpg', '006', 12)
productManager.addProduct('Moto G42', 'Descripción Moto G42', 400, 'Moto-G42.jpg', '007', 13)
productManager.addProduct('iPhone 13', 'Descripción iPhone 13', 300, 'iPhone-13.jpg', '008', 17)
productManager.addProduct('Xiaomi Redmi 9A', 'Descripción Xiaomi Redmi 9A', 200, 'Xiaomi-Redmi-9A.jpg', '009', 18)
productManager.addProduct('Samsung Galaxy A03', 'Descripción Samsung Galaxy A03', 100, 'Samsung-Galaxy-A03.jpg', '010', 9)
