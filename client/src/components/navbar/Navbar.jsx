import React, { useContext, useState } from 'react'
import "./navbar.css";
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  const {user} = useContext(AuthContext);
  const [openModal, setOpenModel] = useState(false);
  const navigate = useNavigate();
  const handleClick = ()=>{
    if(user){
      console.log(openModal)
      setOpenModel(true);
    }else{
      navigate("/login");
    }
  }
  const handleRegister = ()=>{
    if(user){
      setOpenModel(true);
    }else{
      navigate("/register");
    }
  }
  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to='/' style={{color:'inherit', textDecoration:"none"}}>
            <span className="logo">Anbooking</span>
          </Link>
            {user? user.username : <div className='navItems'>
                <button onClick={handleRegister} className="navButton">Register</button>
                
                <button onClick={handleClick} className="navButton">Login</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar