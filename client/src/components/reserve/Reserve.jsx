import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext"
import axios from "axios"

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const {data, loading, error} =  useFetch(`room/${hotelId}`)
    const {dates} = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];

        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>  //if it is unavailable then isfound
            allDates.includes(new Date(date).getTime())
        );
        return !isFound; //we are finding is available of negation of isFound
    }

    const handleSelect = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
    }
    const navigate = useNavigate();
    const handleClick = async ()=>{
        try{
            await Promise.all(
                selectedRooms.map((roomId)=>{
                    const res = axios.put(`/rooms/availability/${roomId}`,{dates: allDates});
                    return res.data;
                })
            )
            setOpen(false);
            navigate("/");
        }catch(err){

        }
    }
  return (
    <div className="reserve" > 
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
            <span>Select your rooms: </span>
            {data.map((item)=>(
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                        <div className="rSelectRooms">
                        {/* <div className="rPrice">price: {item.price}</div> */}
                            {item.roomNumbers.map((roomNumber)=>(
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input 
                                    disabled={!isAvailable(roomNumber)} 
                                    type="checkbox" value={roomNumber._id} 
                                    onChange={handleSelect} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve