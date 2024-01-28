import User from "../models/User.js";


export const updateUser = async (req,res,next)=>{
    //new keyword create instance of an object
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    //new keyword create instance of an object
    try {
        await User.findByIdAndDelete(req.params.id); 
        res.status(200).json("hotel has been deleted"); //we are deleting so no returning
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUser = async (req,res,next)=>{
    //new keyword create instance of an object
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAllUser = async (req,res,next)=>{
     //new keyword create instance of an object
     try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
}

