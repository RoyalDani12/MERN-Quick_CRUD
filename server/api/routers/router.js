import express from 'express'
const router = express.Router()
import addUser from "../controller/addUser.js"
import getUser from '../controller/getUser.js'
import deleteUser from '../controller/deleteUser.js'
import getEdite from '../controller/getEdite.js'
import updateUser from '../controller/updateUser.js'





router.post('/adduser' , addUser)
router.get('/getuser',getUser)
router.delete('/deleteuser/:id',deleteUser)
router.get('/getedite/:id',getEdite)
router.put('/updateuser/:id',updateUser)


export default router