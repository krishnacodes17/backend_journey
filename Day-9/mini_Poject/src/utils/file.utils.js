import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data" , "tasks.json")



export const readTask = ()=>{
    try {
        ensureFileExists();
        const data = fs.readFileSync(filePath,"utf-8")
        return JSON.parse(data || [])
    } catch (error) {
        console.log("error reading task : ", error)
        return[];
    }

}

export const writeTask = (tasks)=>{
    try {
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2),"utf-8")
        
    } catch (error) {
        console.log("Error witing task : ", error)
    }    
}


const ensureFileExists = ()=>{
    try {
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(path.dirname(filePath), {recursive:true});
            fs.writeFileSync(filePath,"[]" , "utf-8")
        }
    } catch (error) {
        console.error("Error ensure file exists : ", error)
    }
}
