import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt  from "jsonwebtoken";

export const register = async (req,res,next)=>{
    console.log(req.body.email);
    try{
        const salt = await bcrypt.genSaltSync(10);
        console.log("hii register")
        const hash = await bcrypt.hashSync(req.body.password, salt);
        
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,     
            password: hash   
        })
        
        await newUser.save();
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}

export const login = async (req,res,next)=>{
    try{
        
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User not found!"));

        //as in data base password is in encrypted form so using bcrypt compare function we are compare user passord and req.password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if(!isPasswordCorrect) return next(createError(404, "Wrong password or username!"));

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);

        //in responce we should not send the password so except password we are sending otherdetails
        const {password, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true          //it dont allow client to reach the cookie
        }).status(200).json({...otherDetails});

    }catch(err){
        next(err);
    }
};