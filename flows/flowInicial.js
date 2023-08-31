const {addKeyword} = require('@bot-whatsapp/bot')


const FlowInicial = addKeyword('hola')
    .addAnswer('Saludos, ¿Cómo te puedo ayudar?')


module.exports = {FlowInicial}