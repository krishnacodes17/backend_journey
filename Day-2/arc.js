const fs = require("fs")

setImmediate(()=>{
    console.log("hellow from setImmediate")
},0)

setTimeout(()=>{
    console.log("hellow form setTimeout")
})

console.log("hellow 1")    // jab koi top level code nahi hota too jo sequence me code un hoo aha hai oo sequence change hoo sakta hai 



let start = Date.now()

const crypto = require("crypto")

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})
crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})

crypto.pbkdf2("password-1" , "salt1" , 1000 ,1024 , "sha512" ,()=>{
    console.log(`${Date.now()- start}ms Done `)
})



// process.env.UV_THREADPOOL_SIZE=64     // we can increase our threadPool wokkers
