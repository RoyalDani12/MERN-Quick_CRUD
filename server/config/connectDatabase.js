
import mongoose from "mongoose"

const connDatabase=async()=>{

try {
    const res = await mongoose.connect(process.env.MONGO_URL)
     console.log("Database connected succefully...");
} catch (error) {
  console.log("Failed to connect",error) 
}

}
export  default connDatabase