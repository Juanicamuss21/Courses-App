import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className='about-section'>
      <div className='about-container'>
          <h1 className='title-about'>
              ¡Bienvenidos a Courses App!
          </h1>
          <div className='description-about'>
            <p>
              Soy Juan Ignacio Camus, el fundador de esta emocionante iniciativa educativa. Permítanme contarles un poco sobre mí y la inspiración detrás de nuestro proyecto.
            </p>

            <p>
              Desde hace tiempo, he estado inmerso en el fascinante mundo de la programación y la tecnología. Mi pasión por la programación me llevó a aprender una variedad de lenguajes y tecnologías, pero también me hizo darme cuenta de que el proceso de aprendizaje no siempre es sencillo. Los recursos disponibles pueden ser abrumadores y a menudo carecen de claridad y estructura.
            </p>

            <p>
              Fue entonces cuando nació la idea de Courses App. Nuestra misión es simplificar el aprendizaje de la programación y hacer que sea accesible para todos, desde principiantes hasta expertos. Queremos proporcionar una plataforma donde puedas aprender de manera efectiva y sin complicaciones.
            </p>
          </div>
      </div>
  </section>
  )
}

export default About
