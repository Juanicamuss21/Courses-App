import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './VideoCourse.css'
import * as actions from '../../redux/actions'
import SearchBar from '../SearchBar/SearchBar'
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai'
import { VscChromeClose } from 'react-icons/vsc'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const VideoCourse = () => {
  const dispatch = useDispatch()

  const { id, idVideo } = useParams()

  useEffect(() => {
    dispatch(actions.detailNull())
    dispatch(actions.getDetail(id))
  }, [dispatch, id])

  const myVideo = useSelector(state => state.detail)

  const video = myVideo.images && JSON.parse(myVideo.images).find(el => el.id === parseInt(idVideo))

  return (
    <section className='section-detail'>

      <SearchBar myVideo={myVideo}/>

      <div className='div-detail'>

      <NavLink to={'/home'}>
        <VscChromeClose className='icon-back'/>
      </NavLink>

      <div className='iframe-title'>
      {
      video
        ? <div className='div-video'>
      <div className='div-video-iframe'>
        <iframe src={video.video} title='nose' frameBorder="0" allowFullScreen></iframe>
      </div>
      <div>
        <h3>{video.title}</h3>
      </div>
      </div>

        : <span class="loader"></span>

      }
      </div>

      <div className='contenido'>
      {
      video &&

      <div>
        <h3 className='category-detail'>{myVideo.category}</h3>

      <div>
        <h3 className='title-autor'>{myVideo.autor}</h3>
        <BsFillPatchCheckFill className='iconcheck-detail'/>
      </div>

        <p>{video.description}</p>

        <div className='icons'>
        <div className="div-youtube">
        <a href={`https://www.youtube.com/@${myVideo.autor.replace(/\s+/g, '')}`}
        target="_blank" rel='noreferrer'><AiFillYoutube className='icon-youtube'/></a><br/>
        </div>
        <a href={myVideo.github} target="_blank" rel='noreferrer'><AiFillGithub className='icon-github'/></a>
        </div>

        <a href={myVideo.documentation} target="_blank" rel='noreferrer' className='documentation'>Documentación</a>
      </div>

      }
      </div>

    </div>

    </section>
  )
}

export default VideoCourse
