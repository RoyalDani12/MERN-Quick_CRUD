
import usermodel from "../models/usermodel.js"

const adduser = async(req,res)=>{
  const { name,age,email }= req .body

  try {

    // check the user is exist or not

    const existUser = await  usermodel.findOne({ email })
    if(existUser){
      return res.status(400).json({message:"user already exist"})
    }
    // if the user is not exist create new user
      const newUser = new usermodel({
        name,
        age,
        email
      })
      // save to the data base
      const saveduser =  await newUser.save()

      res.status(200).json(saveduser)

  } catch (error) {
    res.status(500).json({message:"internal server error",error})
    
  }

 
}


export default adduser