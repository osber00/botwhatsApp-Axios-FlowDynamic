const {addKeyword} = require('@bot-whatsapp/bot')
const axios = require('axios')

const productos_url = "https://fakestoreapi.com/products"

exports.FlowProductos = addKeyword('productos')
    .addAnswer('Dame un momento por favor 😉')
    .addAction(async(ctx,{flowDynamic})=>{
        const peticion = await axios(productos_url)
        //console.log(peticion.data)
        const productos = peticion.data
        let contador = 1

        for(const producto of productos){
            if (contador >= 4) {
                break
            }
            await flowDynamic({body: producto.title+" - Precio: "+producto.price, media: producto.image})
            contador++
        }
    })