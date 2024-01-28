import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const Register = () => {
    const [ credentials, setCredential ] = useState({
        username:undefined,
        email:undefined,
        password: undefined
    }) 

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setCredential((prev)=>({...prev, [e.target.id]:e.target.value}));
    }

    const handleClick = async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        // console.log("credentials - > ",credentials);
        try{
            console.log("ho res")
            const res = await axios.post("/auth/register", credentials);
            console.log("res ->",res.data);
            // console.log("object")
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            
            navigate("/login");
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
        
    }

  return (
    <div className="register">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
            <input type="email" placeholder="email" id="email" onChange={handleChange} className="lInput"/>
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"/>
            <button disabled={loading} onClick={handleClick} className="lButton">Register</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Register