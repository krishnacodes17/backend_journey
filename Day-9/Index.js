import cookieParser from "cookie-parser"
import express from "express"
import session from "express-session"
const app = express ()

app.use(express.json())
app.use(session({
    secret:"myseceat",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24,
    }
}))

app.use(cookieParser("codesnippet")) 

app.get("/",(req,res)=>{
    console.log(req.session),
    console.log(req.session.id)

    res.send("he")
})



//  ceate session 
app.get("/login",(req,res)=>{
    req.session.user = {
        name:"krishna",
        email:"krishna@gmail.com",
        age:35
    }

    res.send(`${req.session.user.name} log in successfully`)
})


app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logout user successfully")
})




const PORT = 3000

app.listen(PORT,()=>{
    console.log(`server is listen on port : ${PORT}`)
})