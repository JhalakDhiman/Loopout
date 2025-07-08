import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const auth = async (req, res, next) => {
    try {
        let token = req.body?.token || req.cookies.token;
        if (!token && req.get("Authorization")) {
            const authHeader = req.get("Authorization");
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "token is not found"
            })
        }
        

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success: false,
                message: "invalid token"
            })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error in middleware"
        })
    }
}