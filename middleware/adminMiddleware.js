const {Admin} = require("../db/index")

async function adminMiddleware(req,res,next){
    const username = req.body.username
    const password = req.body.password

    const response = await Admin.findOne({
        username,
        password
    })

    if(response){
        next()
    }else{
        res.json({
            msg:`Admin doesn't exists`
        })
    }
}

module.exports = adminMiddleware