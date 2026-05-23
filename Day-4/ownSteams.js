const {Readable, Writable}= require("stream")



//  readable steam 
const ReadableSteam = new Readable({
    highWaterMark: 10,
    read() {} ,
})

//  writable Steam 
const writableSteam = new  Writable({
    write(steamData){
        console.log( "steamData Write.... ",steamData)
    },
})

ReadableSteam.on("data" , (chunks)=>{
    console.log("chunks : " , chunks.toString())
})


ReadableSteam.on("data" , (chunks)=>{
    console.log("Writable chunks" , chunks)
    writableSteam.write(chunks)
})


ReadableSteam.push("Hellow ji ")