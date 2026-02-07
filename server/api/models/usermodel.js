import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
  name:String,
  email:String,
  age:Number
} ,{
    timestamps:true
  })

export default mongoose.model("employee",userSchma)