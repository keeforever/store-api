const mongoose = require('mongoose')
const {connect} = mongoose

const connectDB = (uri)=>{
  return connect(uri)
}

module.exports = connectDB