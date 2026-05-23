import express from "express"
import { data } from "./semple.js"
const app = express()

app.use(express.json())


//  industrial way to send data to client
app.get("/api/v1/users",(req,res)=>{
    res.status(200).json({
        message:"all users",
        data
    })
})



//  query params
app.get("/api/v1/user",(req,res)=>{
      const {name} = req.query
      console.log(name)

      if(name){
        const user = data.filter((user)=>{
            return user.name === name
        })

        res.status(200).send(user)
      }

      res.status(200).json({
        message:"all user message",
        data
      })
})


//  route parems 

app.get("/api/v1/user/:id", (req,res)=>{
    const {id} = req.params
    // console.log(typeof(id))
    const parshId = parseInt(id)
    // console.log(typeof(parshId))

    const user = data.filter((user)=>{
        return user.id == parshId
    })

    res.status(200).send(user)
})


//  post data into data 
app.post("/api/v1/user/",(req,res)=>{
    const {name , email}= req.body

    const newUser = {
        id:data.length + 1,
        name,
        email
    }

    data.push(newUser)

    console.log(data)
    res.status(201).json({
        message:"new user ceated "
    })
})


// put (update all filed)
app.put("/api/v1/user/:id",(req,res)=>{
    // const {id} = req.params           // fist method

    const {body , params:{id}} = req     // second method
    
    const parsh_ID = parseInt(id)
    const userIndex = data.findIndex((user)=> user.id === parsh_ID)
    
    if(userIndex === -1){
        res.status(404).send("user not found ")
    }

    data[userIndex] = {
        id:parsh_ID,
        ...body
    }

    res.status(200).send({
        message:"user updated",
        data: data[userIndex]
    })

    console.log(data)
})


//  patch (update update specific field) 
app.patch("/api/v1/user/:id",(req,res)=>{
    // const {id} = req.params           // fist method

    const {body , params:{id}} = req     // second method
    
    const parsh_ID = parseInt(id)
    const userIndex = data.findIndex((user)=> user.id === parsh_ID)
    
    if(userIndex === -1){
        res.status(404).send("user not found ")
    }

    data[userIndex] = {
        ...data[userIndex],
        ...body
    }

    res.status(200).send({
        message:"user updated",
        data: data[userIndex]
    })

    console.log(data)
})


app.delete("/api/v1/user/:id",(req,res)=>{
    const {id} = req.params
    const parshId = parseInt(id)
    // console.log(typeof(parshId))

    data.pop(parshId)
    console.log(data)
    res.send("user deleted successfully")
})








const PORT = 3000 

app.listen(PORT,()=>{
    console.log(`sever is running on PORT : ${PORT}`)
})