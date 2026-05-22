const math = require("./math")
const fs = require("fs")
const path = require('path');
// console.log("hellow backend journey")

// console.log("add of a and b is : ", math.add(5 ,4))
// console.log("sub of a and b is : ", math.sub(5 ,4))



//  file handling 


//  write
// fs.writeFileSync("./file.txt" ,"hellow ji this is a writefilesync ")

// fs.writeFile("./file.txt" ,"this is another method to write file sync way ❤️" ,(err) =>{
//     if(err){
//         console.log("this is error : " ,err)
//     }
//     else{
//         // Ab append ke baad chalega jab write complete ho jayega
//         // fs.appendFileSync("./file.txt", "\nthis is appending file inside our file.txt")
//         // console.log("File write aur append successfully completed!")
//     }
// } )



//  read

// const res = fs.readFileSync("./file.txt" , "utf-8")
// console.log(res)


// const res2 = fs.readFile("./file.txt", "utf-8" , (err , res)=>{
//    if(err){
//      console.log(err)
//    }
//    else{
//     console.log(res)
//    }
// } )



//  update & append file 

fs.appendFileSync("./file.txt", "\nthis is appending file inside our file.txt 😘👍") 

fs.appendFile("./file.txt" ,  `\n this is 2nd time append file ${new Date().toDateString()}`  , (err , res)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(res)
    }
} )



mkdir 


try {
    const folderPath = path.join(__dirname, 'my_new_folder');
    
    // Folder banane ke liye
    fs.mkdirSync(folderPath);
    
    console.log("Folder successfully ban gaya!");
} catch (error) {
    // Agar folder pehle se bana hua hai, to error aayega
    console.error("Folder nahi ban paya:", error.message);
}



//  copy 

fs.cpSync("./file.txt" , "./copy.txt")
fs.cp("./file.txt" , "./copy.txt" , (err)=>{
    console.log(err)
})

//  delete

fs.unlinkSync("./copy.txt")

