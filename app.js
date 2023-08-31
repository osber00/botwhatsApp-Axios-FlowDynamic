require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

const {FlowInicial} = require('./flows/flowInicial')
const {FlowProductos} = require('./flows/flowProductos')
const {FlowBuscarUsuario} = require('./flows/flowBuscarUsuario')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = process.env.DATABASE_HOST
const MYSQL_DB_USER = process.env.DATABASE_USER
const MYSQL_DB_PASSWORD = process.env.DATABASE_PASSWORD
const MYSQL_DB_NAME = process.env.DATABASE_NAME
const MYSQL_DB_PORT = process.env.DATABASE_PORT



const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([FlowInicial, FlowProductos, FlowBuscarUsuario])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
