const express = require("express")
const router = express.Router()
const {Course, Admin} = require("../db/index")
const adminMiddleware = require("../middleware/adminMiddleware")


router.post('/signup',async(req,res)=>{ 
    const username = req.headers.username
    const password = req.headers.password
    try{
        const admin = await Admin.create({
            username,
            password
        })
        res.status(200).json({
            msg:`The Admin created successfully , here is your admin id : ${admin._id}`
        })
    }catch(err){
        res.status(400).json({
            msg:'There is some problem , please try again later'
        })
    }
})

router.post('/courses',adminMiddleware,async(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink
    try{
        const course = await Course.create({
            title,
            description,
            price,
            imageLink
        })
        res.status(200).json({
            msg:`The course is created successfully , the courseId : ${course._id}`
        })
    }catch(err){
        res.status(400).json({
            msg:'There is some problem, please try out later'
        })
    }
})

router.get('/courses',adminMiddleware,async(req,res)=>{
    try{
        const allCourses = await Course.find({})
        res.status(200).json({
            courses: allCourses
        })
    }catch(err){
        res.status(400).json({
            msg:'There is some problem please try again later'
        })
    }
})
module.exports = router