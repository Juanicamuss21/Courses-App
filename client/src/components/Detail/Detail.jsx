import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import './Detail.css'
import SearchBar from '../SearchBar/SearchBar'
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
// import imgYoutube from "../../assets/icono-youtube.png"

const Detail = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(actions.detailNull())
    dispatch(actions.getDetail(id))
  }, [dispatch, id])

  const myVideo = useSelector(state => state.detail)

  const firstVideo = myVideo && myVideo.images && JSON.parse(myVideo.images)[0]

  return (

    <section className='section-detail'>

    <SearchBar myVideo={myVideo}/>

    <div className='div-detail'>

    <NavLink to="/home">
    <VscChromeClose className='icon-back'/>
    </NavLink>

      <div className='iframe-title'>
        {
          firstVideo
            ? <div className='div-video'>
                <div className='div-video-iframe'>
                   <iframe src={firstVideo.video} title='nose' frameBorder="0" allowFullScreen></iframe>
                </div>
                <div>
                  <h3>{firstVideo.title}</h3>
                </div>
              </div>
            : <span class="loader"></span>
        }
      </div>

      <div className='contenido'>
      {
      myVideo && myVideo.autor &&

      <div>
        <h3 className='category-detail'>{myVideo.category}</h3>

        <div>
        <h3 className='title-autor'>{myVideo.autor}</h3>
        <BsFillPatchCheckFill className='iconcheck-detail'/>
        </div>

        <p>{myVideo.description}</p>

        <div className='icons'>
        <div className='div-youtube'>

        <a href={`https://www.youtube.com/@${myVideo.autor.replace(/\s+/g, '')}`}
        target="_blank" rel='noreferrer'><AiFillYoutube className='icon-youtube'/></a>

        </div>
        <div className="div-github">
        <a href={myVideo.github} target="_blank" rel='noreferrer'><AiFillGithub className='icon-github'/></a>
        </div>
        </div>
        <a href={myVideo.documentation} target="_blank" rel='noreferrer' className='documentation'>Documentación</a>
        </div>
      }
      </div>

    </div>

  </section>
  )
}

export default Detail
