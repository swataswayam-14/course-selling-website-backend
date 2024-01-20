const {User} = require("../db/index")

async function userMiddleware(req,res,next){
    const username = req.body.username
    const password = req.body.password

    const response = await User.findOne({
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

module.exports = userMiddleware