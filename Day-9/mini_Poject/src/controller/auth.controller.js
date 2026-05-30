// login 

export const login = (req,res)=>{
    const {username} = req.body;

    if(!username){
        return res.status(400).json({
            error:"username is requied"
        })
    }

    req.session.user = username;
    res.cookie("username",username , {httpOnly:true , maxAge:1000*60*60*24})

    res.status(200).json({
        message:"user login successfully",
        username
    })
}



//  logout
export const logout = (req,res)=>{
    res.clearCookie("username")
    req.session.destroy((err)=>{
        if(err) {
            return res.status(500).json({error:"somthing went wrong"})
        }
    })

    res.json({message:"logout successfully"})
}