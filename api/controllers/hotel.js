import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req,res,next)=>{
    //new keyword create instance of an object
    // console.log("hi there");
    const newHotel = new Hotel(req.body); //Hotel is model, req is what we are taking from user
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);// bcz of this we get output in postman 
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateHotel = async (req,res,next)=>{
    //new keyword create instance of an object
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req,res,next)=>{
    //new keyword create instance of an object
    try {
        await Hotel.findByIdAndDelete(req.params.id); 
        res.status(200).json("hotel has been deleted"); //we are deleting so no returning
    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req,res,next)=>{
    //new keyword create instance of an object
    // console.log(req.params.id);
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req,res,next)=>{
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min || 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {           
      next(err);
    }
}

export const countByCity = async (req,res,next)=>{
    //we are fetching query from url which is like london,delhi,goa so to convert it 
    //into array we are using split(",") means after , array will take new element [london,delhi,goa]
    const cities = req.query.cities.split(",") 
    
    try {
       const list = await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city});
    }))
    res.status(200).json(list);
   } catch (err) {
       next(err);
   }
}

export const countByType = async (req,res,next)=>{
    //we are fetching query from url which is like london,delhi,goa so to convert it 
    //into array we are using split(",") means after , array will take new element [london,delhi,goa]
    
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartments"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type: "villas"});
        const cabinCount = await Hotel.countDocuments({type: "cabins"});
        // console.log(hotelCount);
        // console.log(apartmentCount);
        // console.log(resortCount);
        // console.log(villaCount);
        // console.log(cabinCount);
        
    res.status(200).json([
        {type:"hotel", count: hotelCount},
        {type:"apartments", count: apartmentCount},
        {type:"resorts", count: resortCount},
        {type:"villas", count: villaCount},
        {type:"cabins", count: cabinCount} 
    ]);
   } catch (err) {
       next(err);
   }
}

export const getHotelRooms = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room);
        }))
        // console.log(list)
        return res.status(200).json(list)
    }catch(err){
        next(err);
    }
}


