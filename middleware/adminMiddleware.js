const {Admin} = require("../db/index")

async function adminMiddleware(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

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