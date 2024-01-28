import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    isAdmin:{
        type:Boolean,
        require: false
    }
},
{ timestamps: true});

export default mongoose.model("User", UserSchema);
