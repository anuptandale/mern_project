import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type:String,
        require: true
    },
    city:{
        type:String,
        require: true
    },
    addresss:{
        type:String,
        require: true
    },
    distance:{
        type:String,
        require: true
    },
    photos:{
        type:[String]
    },
    title:{
        type:String,
        require: true
    },
    desc:{
        type:String,
        require: true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String]
    },
    cheapestPrice:{
        type:String,
        require: true
    },
    featured:{
        type:Boolean,
        require: false
    }
});

export default mongoose.model("Hotel", HotelSchema);
