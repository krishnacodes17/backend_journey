import express from "express"
import authMiddeleware from "../middleware/auth.middleware.js";

const router = express.Router();


// Dashboard  (access who have token )

router.get("/dashboard", authMiddeleware,(req,res)=>{
    res.status(200).send({
        message:`welcome to dashboard : ${req.user.name}`
    })
})


export default router