import { validateToken } from "../Utils/token.utils.js"


const authMiddeleware = (req,res,next)=>{
    const token = req.headers['authorization']
    if(token && validateToken(token)){
        req.user = {name:"kishna", id:1}
        next()
    }
    else{
        res.status(401).send("unauthorized : inavlid token")
    }
}

export default authMiddeleware