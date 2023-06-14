import React from 'react'
import { NavLink } from 'react-router-dom'
import {BsFillPatchCheckFill} from "react-icons/bs"
import "./CoursesFound.css"

const CoursesFound = ({allVideos}) => {

  return (
    <div className='courses-found'>
    {
        allVideos.map(el => {
            return(
                
                <div className='courses-found-child' key={el.id}>
                         
                    {/* <div className='img-btn-delete'> */}
                        
                    {/* {
                        el.createdForUser && <button className='btn-delete' onClick={() => handleDeleteCourse(el.id)}><VscChromeClose className='icon-delete'/> </button>
                    } */}
                    <div>
                    <NavLink to={`videos/${el.id}`}>
                    <img className='img-carrousel' src={el.image} id={el.id} alt="" />    
                    </NavLink>
                    </div>
                    
                    <div>
                    <h4>{el.title}</h4> 
                    {/* </div>                         */}                
                    <a href={`https://www.youtube.com/@${el.autor.replace(/\s+/g, '')}`} className='autor-card' target="_blank" rel='noreferrer'>
                    {el.autor} <BsFillPatchCheckFill className='icon-check'/>
                    </a>
                    </div>
                </div>
                
                )
            })
        }
        </div>
  )
}

export default CoursesFound