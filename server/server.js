import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
configDotenv()
import connDatabase from "./config/connectDatabase.js"
import router from "../server/api/routers/router.js"
 connDatabase()



const app =express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',router)
const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log('server running');
  
})