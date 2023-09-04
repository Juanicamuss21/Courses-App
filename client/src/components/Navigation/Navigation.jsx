import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSearch, FaBars } from 'react-icons/fa'
// import userEmpty from '../../assets/userEmpty.png'
import './Navigation.css'
import * as actions from '../../redux/actions'
import { useLocation, NavLink } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
import { Toaster } from 'react-hot-toast'

const Navigation = () => {
  const location = useLocation()
  // const navigate = useNavigate()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [isIconOpen, setIsIconOpen] = useState(false)
  const [pathName, setPathName] = useState('')
  const path = location.pathname

  useEffect(() => {
    setPathName(path)
  }, [path])

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit () {
    dispatch(actions.getCourseByName(name))
    setName('')
  }

  const reload = () => {
    window.location.href = '/home'
  }

  // const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()

  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const openModal = () => {
    setIsIconOpen(true)
  }

  const closeModal = () => {
    setIsIconOpen(false)
  }

  const handleOutsideClick = (e) => {
    if (isIconOpen) {
      closeModal()
    } else {
      openModal()
    }
  }

  return (
    <header className="header">
        <nav className="nav">

        {
          pathName !== '/' &&
        <div className="title-nav" onClick={() => reload()}>
         <h1>Courses App</h1>
        </div>
        }

        <div className={`input-total ${pathName === '/home' ? 'visible' : ''}`}>

          <input type="text"
          className="input"
          placeholder="Buscar curso..."
          value={name}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          />
          <button className="btn-nav" onClick={(e) => handleSubmit(e)}><FaSearch/></button>

       </div>

        {
          pathName !== '/' &&

          <div>
                <FaBars className={`icon-bars ${isIconOpen ? 'open' : ''}`} onClick={(e) => handleOutsideClick(e)}/>

                <div className={`nav-links ${isIconOpen ? 'open' : ''}`}>
                  <NavLink to="/home/form" className="nav-links_child">
                    <h4>Subir Curso</h4>
                  </NavLink>
                  <NavLink to="/home/about" className="nav-links_child">
                    <h4>Sobre mi</h4>
                  </NavLink>
                </div>
          </div>
        }

        </nav>
        <Toaster
                position='top-center'
                reverseOrder={true}
                toastOptions={{
                  className: '',
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: 'white',
                    fontSize: '15px'
                  }
                }}
              />
    </header>
  )
}

export default Navigation
