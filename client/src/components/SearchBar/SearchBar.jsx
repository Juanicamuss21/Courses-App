import React, { useState } from 'react'
import './SearchBar.css'
import { FaBars } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { VscChromeClose } from 'react-icons/vsc'
// import useLocalStorage from "../useLocalStorage"

const SearchBar = ({ myVideo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const storedItem = window.localStorage.getItem('isChecked')
  const initialCheckedValues = storedItem ? JSON.parse(storedItem) : []

  const [isChecked, setIsChecked] = useState(initialCheckedValues)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCheck = (e) => {
    const { value, checked } = e.target

    setIsChecked((prevChecked) => {
      let updatedCheckedValues
      if (checked) {
        updatedCheckedValues = [...prevChecked, value]
      } else {
        updatedCheckedValues = prevChecked.filter((checkbox) => checkbox !== value)
      }

      window.localStorage.setItem(
        'isChecked',
        JSON.stringify(updatedCheckedValues ? updatedCheckedValues.slice(-50) : [])
      )
      return updatedCheckedValues
    })
  }

  return (
    <div>
      <div className='icon-nav'>
        <FaBars onClick={toggleSidebar} className="icon" />
        {
          myVideo.images && JSON.parse(myVideo.images).length > 1 &&
          <p>Ver más</p>
        }
      </div>
      <div className={!isSidebarOpen ? 'modal' : 'modal is-open'} onClick={toggleSidebar}>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

          <div className='title-button'>
          <p>Videos</p>
          <button onClick={toggleSidebar}><VscChromeClose className='icon-close'/></button>
          </div>

          <div>
            {
              myVideo.images && JSON.parse(myVideo.images).map(el => {
                return (
                    <div key={el.title} className='title-check'>
                      <div className='title-searchbar'>
                      {
                        JSON.parse(myVideo.images).length > 1
                          ? <NavLink onClick={() => toggleSidebar()} className="no-active" activeclassName="active" to={`/home/videos/${myVideo.id}/${el.id}`}>
                          <p>{el.title}</p>
                          </NavLink>
                          : <p className='not-navlink'>{el.title}</p>

                      }
                      </div>
                  <input type="checkbox" onChange={(e) => handleCheck(e)} checked={isChecked.includes(el.title)} value={el.title} className='input-check'/>
                  </div>
                )
              })
            }
          </div>

      </div>
    </div>
  </div>
  )
}

export default SearchBar
