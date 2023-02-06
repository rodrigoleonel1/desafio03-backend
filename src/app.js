const express = require('express')
const products = require('./products.json')

const app = express()
app.listen(8080, () => console.log('Servidor inicializado!'))

app.get('/products', ( request, response ) =>{
    let limit = request.query.limit
    if (!limit){
        response.send({ products }) 
    } else if (isNaN(limit)){
        response.send({ error: 'Para realizar una búsqueda con límite debe ingresar un número del 1 al 10.' })
    } else if(limit > 10){
        response.send({ error: 'Para realizar una búsqueda con límite debe ingresar un número del 1 al 10.' })
    } else {
        let productsFilter = products.slice(0, limit)
        response.send({ products : productsFilter })
    }
})

app.get('/products/:pid', ( request, response ) =>{
    const { pid } = request.params
    const product = products.find( product => product.id.toString() === pid)
    if (!product){
        response.send({ error: 'No existe ningún producto con ese id.'})
    } else {
        response.send({ product })
    }
})
