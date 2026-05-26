import express from "express"
import publicRoutes from "./Routes/public.routes.js"
import privateRoute from "./Routes/private.routes.js"
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
import logMiddeleware from "./middleware/log.middleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if(!fs.existsSync(path.join(__dirname, "logs"))){
    fs.mkdirSync(path.join(__dirname, "logs"))
}


const app = express()

//*  in Build middeleWare
app.use(express.json())


// ! Global custom middleware
app.use(logMiddeleware)



// ? middleware to routes 
app.use("/public",publicRoutes )
app.use("/private",privateRoute)



const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is running On port : ${PORT}`)
})