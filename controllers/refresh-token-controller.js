import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const existingUser= await User.findOne({ refreshToken }).exec();
    if (!existingUser) {
        return res.sendStatus(403); //Forbidden 
    }

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err || existingUser.email !== decoded.email) {
                return res.sendStatus(403);
            }

            const roles = Object.values(existingUser.role);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.JWT_SECRET,
                { expiresIn: '30s' }
            );
            return res.json({ roles, accessToken })
        }
    );
};

