import jwt from 'jsonwebtoken';

async function authMiddleware(req,res,next){
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "No Token provided!"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user = {
            id: decoded.id
        }
        next();
    } catch(err){
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        })
    }
    
}

export default authMiddleware;