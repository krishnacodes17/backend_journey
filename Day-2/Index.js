const http = require("http")
const fs = require("fs")

const PORT = 3000

const myServer = http.createServer((req,res)=>{

    const log = `${Date.now()} : New request received  & form ${req.url} enjoy `

    fs.appendFile("./log.txt" ,log , (err)=>{
        if(err){
            console.log(err)
            res.statusCode = 500
            res.end("internal server error ")
        }
    })
    res.end("hellow form server side")
})


myServer.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})




//  Global Object 
// console.log(Object.getOwnPropertyNames(global))

//  eg of global object
setTimeout(()=>{
    console.log("this is global object ")
},2000)

let a =1

let interval = setInterval(()=>{
    a++
    console.log("this is set interval " , a)

    if(a == 8){
        clearInterval(interval)
    }
},2000) 