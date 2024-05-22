const JWTService  = require("../services/JWTServices")

const verifyAccessTokenMiddleware = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verified = JWTService.verifyAccessToken(token);
        console.log(verified);
        req.user=verified;
        
        next();
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    }


module.exports={
    verifyAccessTokenMiddleware

}