import React from 'react'
import "./Videos.css"
import Carrousel from '../Carrousel/Carrousel'

const Videos = ({allVideos}) => {
  return (
    <div className='section'>
      <Carrousel allVideos={allVideos}/>
    </div>
  )
}


  export default Videos