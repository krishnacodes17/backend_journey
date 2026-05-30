import { readTask, writeTask } from "../utils/file.utils.js"



export const getAllTask =  (req,res)=>{
    if(!req.session.user){
        return res.status(401).json({
            message:"unauthoized"
        })
    }

    const tasks = readTask()
    res.json(tasks.filter((task)=>task.username === req.session.user.username))
}


export const taskCreate = async(req,res)=>{
    const {title, description } = req.body;
    const tasks = await readTask()

    const newTask = {
        id:Date.now(),
        username:req.session.user.username,
        title,
        description,
        completeTask:false
    }
    tasks.push(newTask)
    await writeTask(tasks)

    res.status(201).json({
        message:"task created successfully",
        newTask
    })
}


export const updateTask = (req,res)=>{

}


export const deleteTask =  (req,res)=>{

}