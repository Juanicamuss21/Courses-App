import React from 'react'
import Videos from '../Videos/Videos'
import { useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../redux/actions"
import "./Home.css"
import {HiArrowRight} from "react-icons/hi"
import CoursesFound from '../CoursesFound/CoursesFound';


const Home = () => {

  const allVideos = useSelector(state => state.allVideos)

  const newVideos = allVideos.filter(el => el.category === "Others")
  
  const frontendVideos = allVideos.filter(el => el.category === "Frontend")

  const backendVideos = allVideos.filter(el => el.category === "Backend")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllVideos())
  },[dispatch])
 
  return (
    
    
    <div>
      {

       allVideos.length > 5?

      <div>

        <div className='div-home'>
        <h1>Cursos nuevos</h1>

        {
          window.innerWidth < 600 && 
        
        <div className='title-arrow'>
        {/* <HiArrowLeft/>
        <h4>Previus</h4> */}
        <h4>Next</h4>
        <HiArrowRight/>
        </div>
      }
      </div>
        <Videos allVideos={newVideos}/>

        
        <div className='div-home'>
        <h1>Front-end</h1>
        {/* <div className='title-arrow'>
        <h4>Next</h4>
        <HiArrowRight/>
        </div> */}
        </div>
        <Videos allVideos={frontendVideos.slice(0, 7)}/>
        <Videos allVideos={frontendVideos.slice(7)}/>

      
        <div className='div-home'>
        <h1>Back-end</h1>
        {/* <div className='title-arrow'>
        <h4>Next</h4>
        <HiArrowRight/>
        </div> */}
        </div>
        <Videos allVideos={backendVideos.slice(0, 6)}/>
        <Videos allVideos={backendVideos.slice(6)}/>

      </div>

      : 

      <div className='courses-searched'>
      
      <CoursesFound allVideos={allVideos}/>

      </div>
    }
      
    </div>
      
    
  )
}

export default Home