import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux"
import {FaSearch} from "react-icons/fa";
import userEmpty from "../../assets/userEmpty.png"
import "./Navigation.css";
import * as actions from "../../redux/actions"
import {NavLink} from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import {useLocation} from "react-router-dom"
import {Toaster} from "react-hot-toast";

 
const Navigation = () => {

  const location = useLocation()
  // const navigate = useNavigate()

  const dispatch = useDispatch()

  const [name, setName] = useState("");
  
  const [pathName, setPathName] = useState('');
  
  const path = location.pathname;

  useEffect(() => {
    setPathName(path);
  }, [path]);

    const handleInputChange = (e) => {
      e.preventDefault()
      setName(e.target.value)
    }
  
    function handleSubmit(){  
      dispatch(actions.getCourseByName(name))   
      setName("")
    }
    
    const reload = () => {
      window.location.href = "/home";
    }

    const {user, isAuthenticated, logout,loginWithRedirect, isLoading} = useAuth0()

    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    }

  const [isImgOpen, setIsImgOpen] = useState(false);

  const toggleSidebar = () => {
    setIsImgOpen(!isImgOpen);
  };

  console.log(isLoading)

  return (
    <header className="header">
        <nav className="nav">
        
        {
          pathName !== "/" &&
        
        <div className="title-nav" onClick={() => reload()}>
         <h1>Courses App</h1>
        </div>

        }

        {
           pathName === "/home" &&
         
         <div className="input-total">
            <input type="text" 
            className="input"
            placeholder="search course..."
            value={name}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleKeyDown(e)} 
            />
            <button className="btn-nav" onClick={(e) => handleSubmit(e)}><FaSearch/></button>
          
         </div>
        }

        {
         isAuthenticated ? 
         <div>
         <img onClick={toggleSidebar} className={`img-nav`} src={user.picture} alt="foto"/>
         <div className={`menu-user ${isImgOpen ? 'open' : ''}`}>
          <div className="menu-desciption">
          <h3>Bienvenido</h3>
          {/* <h3>{user.name}</h3> */}
          <p>{user.email}</p>
          </div>
          <div className="btns-menu">
          <NavLink to="/home/form">
          <button onClick={toggleSidebar}>Subir Curso</button>
          </NavLink>
          <button onClick={logout}>Logout</button>
          </div>
         </div>       
         </div>
          :
        <div>
         <img onClick={toggleSidebar} className="img-nav" src={userEmpty} alt="foto"/>
         <div className={`menu-user ${isImgOpen ? 'open' : ''}`}>
         <div className="menu-desciption">
         <h3>Bienvenido usuario</h3>
         <p className="text-menu">Para subir un curso primero debes loguearte.</p>
         </div>
          <div className="btns-menu">
         <button className="btn-menu" onClick={loginWithRedirect}>Login</button>
          </div>
         </div>
        </div>
        }
          
        </nav>
        <Toaster
                position='bottom-right'
                reverseOrder={true}
                toastOptions={{
                  className: "",
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "white",
                    fontSize: "15px"
                  },
                }}
              />
    </header>
  )
}

export default Navigation