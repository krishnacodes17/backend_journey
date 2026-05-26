import express from "express"

const app = express()
app.use(express.json())

// app.use(sayHiMiddelewae)      // this global middelewaer
app.use(routesMiddeleware)    // this is routes middeleWare 


//  middeleware
function sayHiMiddelewae (req , res , next){
    console.log("This hi hi middeleware ")
    next()   // this help too call next pocess  what ever you want too doo
}

function routesMiddeleware (req,res,next){
    console.log("This is routes middeleWare")
    next()
}

app.get("/api/v1/",(req,res)=>{
    res.send("hellow form / routes")
})


app.get("/api/v1/user",routesMiddeleware ,(req,res)=>{
    console.log("this is forom user Routes")
    res.send("hellow from user routes")
})


const PORT = 3000

app.listen(PORT , ()=>{
    console.log("server is running on PORT : ", PORT)
})