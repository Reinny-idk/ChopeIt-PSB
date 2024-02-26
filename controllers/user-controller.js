import User from "../models/User.js";
import Chope from "../models/Chope.js";
import bcrypt from "bcryptjs";
import session from "express-session";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({message:"Unexpected error occurred."});
    }

    return res.status(200).json({users});
};

export const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;

    if (!name && name.trim()==="" && 
        !email && email.trim()==="" && 
        !password && password.trim()==="") {

        return res.status(422).json({message:"Invalid inputs."});
    }

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) {
        return res.sendStatus(409); //Conflict
    } 

    // Password encryption
    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = new User({name, email, password: hashedPassword});
        user = await user.save();
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({message:"Unexpected error occurred"});
    }
    return res.status(201).json({user});
};

export const updateUser = async (req, res, next) => {
    const id = req.params.id;

    const {name, email, password} = req.body;

    if (!name && name.trim()==="" && 
        !email && email.trim()==="" && 
        !password && password.trim()==="") {

        return res.status(422).json({message:"Invalid inputs."});
    }
    const hashedPassword = bcrypt.hashSync(password);

    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword});
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({message:"Error occurred during update."});
    }
    return res.status(200).json({message:"Updated successfully."});
};

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({message:"Error occurred while deleting."});
    }
    return res.status(200).json({message:"Deleted successfully."});

};

export const logIn = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email && email.trim()==="" && !password && password.trim()==="") {
        return res.status(422).json({message:"Invalid inputs."});
    }

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser){
        return res.status(404).json({message:"The email you entered does not exist."});
    }

    const checkPassword = bcrypt.compareSync(password, existingUser.password);

    if (checkPassword) {
        const roles = Object.values(existingUser.role).filter(Boolean);
        
        // Session initialization [remove if jwt works]
        req.session.authenticated = true;
        req.session.user = {
            userID: existingUser._id,
            email: existingUser.email,
        };
        
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": existingUser.email,
                    "roles": roles
                }
            },
            process.env.JWT_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "email": existingUser.email },
            process.env.REFRESH_SECRET,
            { expiresIn: '12h' }
        );
        // Saving refreshToken with current user
        existingUser.refreshToken = refreshToken;
        const result = await existingUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        // Send authorization roles and access token to user
        return res.json({ roles, accessToken });

    } else {
        return res.sendStatus(401);
    }

    // if (!checkPassword) {
    //     return res.status(400).json({message:"The password you entered was incorrect."});
    // } else {
    //     const jwtToken = jwt.sign(
    //         {id: existingUser._id, email: existingUser.email},
    //         process.env.JWT_SECRET,
    //     );
        
    //     return res.status(200).json({message:"Logged in successfully.", jwtToken});
    // }

    // if (req.session.authenticated) {
    //     res.json(req.session);
    // } else {
    //     if (checkPassword) {
    //         req.session.authenticated = true;
    //         req.session.user = {
    //             userID: existingUser._id,
    //             email: existingUser.email,
    //         };

    //         const jwtToken = jwt.sign(
    //             {id: existingUser._id, email: existingUser.email},
    //             process.env.JWT_SECRET,
    //         );

    //         return res.status(200).json({message:"Logged in successfully.", jwtToken});
    //     } else {
    //         return res.status(403).json({ message: "Incorrect password" });
    //     }
    // }

};

export const logOut = async (req, res, next) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const existingUser = await User.findOne({ refreshToken }).exec();
    if (!existingUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    existingUser.refreshToken = '';
    const result = await existingUser.save();
    console.log(result);

    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
};

export const getUserChopes = async (req, res, next) => {
    const userID = req.session.user.userID;

    let chope;

    try {
        chope = await Chope.find({user:userID}).populate("seat");
    } catch (err) {
        return console.log(err);
    }

    if (!chope) {
        return res.status(500).json({message:"Error searching for chopes."});
    }

    return res.status(200).json({chope});
};

