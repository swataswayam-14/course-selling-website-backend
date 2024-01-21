const express = require("express")
const app = express()
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(express.json())
app.use('/admin',adminRoutes)
app.use('/users',userRoutes)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`The server is listening at port ${PORT}`);
})