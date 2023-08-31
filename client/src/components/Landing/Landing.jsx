import React from 'react'
import './Landing.css'
import { useAuth0 } from '@auth0/auth0-react'
import { NavLink } from 'react-router-dom'

const Landing = () => {
  const { loginWithRedirect } = useAuth0()
  const { isAuthenticated, isLoading } = useAuth0()

  return (
  <div className='div-landing'>
    <div className='presentation'>
      <div className='title-landing'>
        <h1>Courses App</h1>
      </div>
      <div className='parrafo-landing'>
        <p> Bienvenido a nuestra plataforma de cursos de programación. Aquí encontrarás una amplia variedad de cursos de programación de alta calidad, tanto de frontend como de backend, para que puedas aprender y mejorar tus habilidades en el mundo de la programación.</p>
        <p>
      Además, nuestra plataforma también ofrece a los usuarios la posibilidad de subir sus propios cursos a la plataforma, para que puedas compartir tus conocimientos y habilidades con la comunidad de programación. Todos los cursos subidos por los usuarios son revisados por nuestro equipo de moderación antes de ser publicados en la plataforma, para garantizar la calidad y relevancia del contenido.
       </p>
        <p>
      Para acceder a nuestros cursos, simplemente regístrate en nuestra plataforma y comienza a explorar nuestro catálogo de cursos. ¡Aprender a programar nunca ha sido tan fácil y accesible!.
       </p>
      </div>
      <div className='btns'>
       <NavLink to="/home">
        <button>Ingresar</button>
        </NavLink>
      {
        !isLoading && !isAuthenticated &&
        <button onClick={loginWithRedirect}>Login</button>
      }
      </div>

    </div>
  </div>
  )
}

export default Landing
