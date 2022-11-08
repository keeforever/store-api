const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
mongoose
Schema 
model
*/ 
const ProductsSchema = new Schema({
  name : {
    type: String,
    required : [true, 'name must be provided.']
  },
  rating : {
    type : Number,
    default: 4.5
  },
  createdAt : {
    type : Date ,
    default : Date.now()
  },
  price : {
    type : Number, 
    required : [true , 'price must be provided']
  },
  company : {
    type : String , 
    enum :['ikea','liddy','caressa','marcos']
  },
  featured : {
    type : Boolean,
    default : false
  }
});

const Products = model("Products", ProductsSchema);

module.exports = Products