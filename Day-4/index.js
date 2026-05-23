const http = require("http")
const fs = require("fs")
const {Transform, pipeline} = require("stream")

const server = http.createServer((req,res)=>{

    /** res jo hota hai readable hota hai  */

    //*  dowloading file through bad way 
    const file = fs.readFileSync("heavyFile.txt")
    res.end(file)


    //*  dowloading file through good way 
    const ReadableSteam = fs.createReadStream("heavyFile.txt")

    //  pipe() method aapane left side me readable kata hai aur Right side me write and read dono kata hai   
    ReadableSteam.pipe(res)



    //* to see how file will be read as chunks 
    const readSteam = fs.createReadStream("heavyFile.txt")
    const writeSteam = fs.createWriteStream("copy.txt")



    readSteam.on("data" , (chunks)=>{
        // console.log(`chunks  : ${chunks}`)     // print our data on terminal console
        writeSteam.write(chunks)                // copy our chunks into copy.txt file 
    })



    //  
    const readSteam2 = fs.createReadStream("./heavyFile.txt")
    const writeSteam2 = fs.createWriteStream("outPut.txt")

    const transformSteam = new Transform({
        transform(chunk, encoding ,callback){
            const modifications = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "kishna")
            callback(null , modifications)
          }
    })

    readSteam2.pipe(transformSteam).pipe(writeSteam2)  // first method 
   

})

const PORT = 3000

server.listen(PORT,()=>{
    console.log(`Server is unning on : ${PORT}`)
})