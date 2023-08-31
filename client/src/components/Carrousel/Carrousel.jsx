import React from 'react'
import './Carrousel.css'
import { useNavigate } from 'react-router-dom'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as actions from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { VscChromeClose } from 'react-icons/vsc'

const Carrousel = ({ allVideos }) => {
  const dispatch = useDispatch()

  const handleDeleteCourse = (id) => {
    dispatch(actions.deleteCourse(id))
  }

  const settings = {
    dots: false,
    infinite: true,
    // swipeToSlide: true,
    // draggable: true,
    swipe: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 3,
          arrows: false,
          swipe: true
          // draggable: true

        }
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 2,
          arrows: false,
          swipe: true,
          draggable: true
        }
      }
    ]
  }

  const navigate = useNavigate()

  const handleDoubleClick = (e) => {
    navigate(`videos/${e.target.id}`)
  }

  const handleClick = (e) => {
    navigate(`videos/${e.target.id}/1`)
  }

  return (
    <Slider {...settings}>

    {
      allVideos.map(el => {
        return (

          <div className='div-img-carrousel' key={el.id}>

            <div className='img-btn-delete'>

              {
                  el.createdForUser && <button className='btn-delete' onClick={() => handleDeleteCourse(el.id)}><VscChromeClose className='icon-delete'/> </button>
              }

            <div className='img-flex'>

              {
                JSON.parse(el.images).length > 1
                  ? <img onClick={handleClick} className='img-carrousel' src={el.image} id={el.id} alt="" />
                  : <img onClick={handleDoubleClick} className='img-carrousel' src={el.image} id={el.id} alt="" />
              }

              <div className='autor-check'>
              <a href={`https://www.youtube.com/@${el.autor.replace(/\s+/g, '')}`} className='autor-card' target="_blank" rel='noreferrer'>
              {el.autor} <BsFillPatchCheckFill className='icon-check'/>
              </a>
              </div>

            </div>
          </div>
        </div>

        )
      })
        }

  </Slider>
  )
}

export default Carrousel
