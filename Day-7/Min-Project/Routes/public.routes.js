import express from "express"
import {generateToken} from "../Utils/token.utils.js"


const router = express.Router();







// genertae Token 

router.get("/generate-token", (req,res)=>{
    const token = generateToken()

    res.status(200).json({
        message:"Token geneated please save it fo future",
        token:token
    })
})


//  home routes

router.get("/home",(req,res)=>{
    res.status(200).send({
        message:"Welcome to home Page "
    })
})




export default router