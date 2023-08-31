require('dotenv').config()
const {addKeyword} = require('@bot-whatsapp/bot')
const axios = require('axios')

const api_url = process.env.URL_USUARIO

exports.FlowBuscarUsuario = addKeyword('buscar usuario')
    .addAnswer('Bien, por favor dime el número de identificación',{capture:true},
    async(ctx,{flowDynamic, endFlow})=>{
        const peticion = await axios.get(api_url+ctx.body)
        if (peticion.data != '') {
            await flowDynamic(peticion.data.firstname+" "+peticion.data.lastname)
            await flowDynamic(peticion.data.email)
            endFlow()
        }else{
            await flowDynamic('No encontré usuario relacionado con el número de documento *'+ctx.body+'*')
            endFlow()
        }
    })