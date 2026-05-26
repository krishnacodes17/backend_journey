import express from "express"
import cookieParser, { signedCookie } from "cookie-parser"

const app = express ()

app.use(express.json())
app.use(cookieParser())



app.get("/",(req,res)=>{
    res.cookie("name","express",
         {maxAge:1000*60*60*24 ,
             httpOnly: true,
             secure:false}
          )    // set cookies in browser 
    res.send("hellow fom server")
})



app.get("/product", (req,res)=>{

    console.log(req.cookies)  // undefine aayea so we use cookie-parser
    console.log(req.header.cookie)

    if(req.cookies.name && req.cookies.name === "express"){

        res.status(200).json({
            id:1,
            name:"item-1",
            price:"$1000"
        })
    }

    res.status(403).send("you ae not authorized ")
})

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`server is listen on port : ${PORT}`)
})