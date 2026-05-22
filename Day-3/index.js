// const path = require("path")

// console.log("fileName : " , __filename)
// console.log("dirName : " , __dirname)

// //  1
// const filePath = path.join("folder" , "student", "data.txt")

// console.log(filePath)


// const parsedDataPath = path.parse(filePath)
// const resolvePath = path.resolve(filePath)
// const extname = path.extname(filePath)
// const baseName = path.basename(filePath)
// const dirname = path.dirname(filePath)

// console.log({
//     parsedDataPath,
//     resolvePath,
//     extname,
//     baseName ,
//     dirname
// })








//  event in node js 

const EventEmitter = require("events")

const emitter = new EventEmitter()

// keyMethods 
// * on(eventName , listener  )         --->  create event

emitter.on("GREETEVENT",()=>{
    console.log("hellow from nodejs events ")
})



// * emit(eventName , [args])          ---> execute event 

emitter.emit("GREETEVENT")

 


//  lets see example with aguments 
emitter.on("ARGGREET", (args)=>{
    console.log(`hellow ${args.userName} your is is : ${args.id}`)
})


emitter.emit("ARGGREET" ,{
    userName:"Krishna",
    id:"ad4542af54a2354aaf"
})