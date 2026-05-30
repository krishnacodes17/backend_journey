import express from "express"
import { deleteTask, getAllTask, taskCreate, updateTask } from "../controller/task.controller.js"

const taskRouter = express.Router()

taskRouter.get("/",getAllTask)

taskRouter.post("/", taskCreate)

taskRouter.put("/:id", updateTask)


taskRouter.delete("/:id",deleteTask)


export default taskRouter