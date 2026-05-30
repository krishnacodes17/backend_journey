import cookieParser from "cookie-parser"
import express from "express"
import session from "express-session"
const app = express()


//  * gobal imports 
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:"your-secreat-key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60 *24
    }
}))

// * local impots 
import authroute from "./src/routes/auth.route.js"
import taskRouter from "./src/routes/task.route.js"
import { authMiddleware } from "./src/middleware/auth.middleware.js"


//  routes 
app.use("/auth", authroute )
app.use("/task",authMiddleware,taskRouter)







const PORT = 3000

app.listen(PORT,()=>{
    console.log(`server is listen on port : ${PORT}`)
})