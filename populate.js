require('dotenv').config()

const connectDB = require('./db/connect')
const Products = require('./model/Products')

const productJSON = require('./products.json')

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    await Products.deleteMany()
    await Products.create(productJSON)
    console.log('Data uploaded successfully.')
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
}

start();