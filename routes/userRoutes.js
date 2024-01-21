const express = require("express")
const router = express.Router()
const {User, Course} = require("../db/index")
const userMiddleware = require('../middleware/userMiddleware')

router.post('/signup',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const isCreated = await User.create({
        username,
        password 
    })
    if(isCreated){
        res.json({
            msg:'User Created successfully'
        })
    }else{
        res.status(400).json({
            msg:'There is some problem , please try later'
        })
    }
})

router.get('/courses',userMiddleware,async (req,res)=>{
    const allCourses = await Course.find({})
    if(allCourses){
        res.status(200).json({
            Courses: allCourses
        })
    }else{
        res.status(400).json({
            msg:'There is some problem , please try again later'
        })
    }
})

router.post('/courses/:courseId', userMiddleware, async (req,res)=>{
    const courseId = req.params.courseId
    const username = req.headers.username
    const password = req.headers.password
    try{
        const user = await User.findOneAndUpdate({
            username,
            password
        },{$push:{coursePurchased:courseId}},{new:true})
        res.status(200).json({
            msg: `${user.username} , you have successfully purchased the course having the courseId ${courseId}`
        })
    }catch(err){
        res.status(400).json({
            msg:'There is some problem , please try again later'
        })
    }

})

router.get('/purchasedCourses', userMiddleware, async(req,res)=>{

    const user = await User.findOne({
        username:req.headers.username,
        password:req.headers.password
    })
    try{
        const courses = []
        user.coursePurchased.forEach(async(courseId)=>{
            const course = await Course.findById(courseId)
            courses.push(course)
        })
        res.status(200).json(courses)
    }catch(err){
        res.status(400).json({
            msg:'There is some problem , please try again later'
        })
    }
})
module.exports = router