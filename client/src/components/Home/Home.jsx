import React, { useEffect } from 'react'
import Videos from '../Videos/Videos'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import './Home.css'
import { HiArrowRight } from 'react-icons/hi'
import CoursesFound from '../CoursesFound/CoursesFound'

const Home = () => {
  const allVideos = useSelector(state => state.allVideos)

  const newVideos = allVideos.filter(el => el.category === 'Others')

  const frontendVideos = allVideos.filter(el => el.category === 'Frontend')

  const backendVideos = allVideos.filter(el => el.category === 'Backend')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllVideos())
  }, [dispatch])

  return (

    <div className='container-home'>
      {

       allVideos.length > 5
         ? <div>

       <div className='titles-home'>
       <h1>Cursos nuevos</h1>

     {
         window.innerWidth < 600 &&

       <div className='title-arrow'>
       <h4>Siguiente</h4>
       <HiArrowRight/>
       </div>
     }

     </div>

        <Videos allVideos={newVideos}/>

      <div className='titles-home'>
        <h1>Front-end</h1>
      </div>
        <Videos allVideos={frontendVideos.slice(0, 7)}/>
        <Videos allVideos={frontendVideos.slice(7)}/>

      <div className='titles-home'>
        <h1>Back-end</h1>
      </div>
        <Videos allVideos={backendVideos.slice(0, 6)}/>
        <Videos allVideos={backendVideos.slice(6)}/>
      </div>

         : <div className='courses-searched'>

         <CoursesFound allVideos={allVideos}/>

         </div>

    }

    </div>

  )
}

export default Home
