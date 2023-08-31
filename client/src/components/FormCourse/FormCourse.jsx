import React, { useState } from 'react'
import './FormCourse.css'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Toaster, toast } from 'react-hot-toast'

function validateInput (input) {
  const errors = {}

  if (input.autor.length > 20) {
    errors.autor = 'No debe exceder los 20 caracteres'
  }

  if (input.image || input.title || input.github || input.documentation || input.description || input.category) {
    if (!input.autor) {
      errors.autor = 'Campo necesario'
    }
  }

  // if (!/^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+(?:\/[^\s]*)?$/i.test(input.image)) {
  //   errors.image = "URL no válida";
  // }

  // if (!/^.+\.(jpg|jpeg|png|gif)$/i.test(input.image)) {
  //   errors.image = "Formato de imagen no reconocida";
  // }

  if (input.images.length > 20) {
    errors.images = 'Limite 20 videos'
  }

  if (input.title || input.github || input.documentation || input.description || input.category) {
    if (!input.image) {
      errors.image = 'Campo necesario'
    }
  }

  if (input.github || input.documentation || input.description || input.category) {
    if (!input.title) {
      errors.title = 'Campo necesario'
    }
  }

  if (input.documentation || input.description || input.category) {
    if (!input.github) {
      errors.github = 'Campo necesario'
    }
  }

  if (input.description || input.category) {
    if (!input.documentation) {
      errors.documentation = 'Campo necesario'
    }
  }

  // if (!/^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+(?:\/[^\s]*)?$/i.test(input.image)) {
  //   errors.documentation = "URL no válida";
  // }

  if (input.category) {
    if (!input.description) {
      errors.description = 'Campo necesario'
    }
  }

  return errors
}

const FormCourse = () => {
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    autor: '',
    image: '',
    images: [{ title: '', description: '', video: '' }],
    title: '',
    description: '',
    github: '',
    documentation: '',
    category: ''

  })

  const [error, setError] = useState({})

  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setError(validateInput({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const [videosQuantity, setVideosQuantity] = useState(1)

  function handleQuantityChange (e) {
    const value = parseInt(e.target.value, 10)
    setVideosQuantity(value)
    if (value <= 20) {
      setInput(prevState => ({
        ...prevState,
        images: Array.from({ length: value }, (_, i) => ({
          id: i + 1,
          title: '',
          description: '',
          video: ''
        }))
      }))
    }
  }

  function handleCourses (e, index) {
    const { name, value } = e.target
    setInput(prevState => ({
      ...prevState,
      images: prevState.images.map((image, i) => {
        if (i === index) {
          return { ...image, [name]: value, id: i + 1 }
        }

        return image
      })
    }))
  }

  function handleClick (e) {
    setInput({
      ...input,
      category: e.target.value
    })
    setError(validateInput({
      ...input,
      category: e.target.value
    }))
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (!input.autor || !input.image || !input.title || !input.github || !input.documentation || !input.description || !input.category) {
      return toast.error('Complete todos los campos')
    }

    if (error.autor || error.image || error.title || error.github || error.documentation || error.description || error.category) {
      return toast.error('Complete correctamente el formulario antes de enviarlo')
    }

    dispatch(actions.postCourse(input))

    setInput({
      autor: '',
      image: '',
      images: [{ title: '', description: '', video: '' }],
      title: '',
      description: '',
      github: '',
      documentation: '',
      category: ''
    })
  }

  return (
    <div className='form-container'>
      <form>
        <div className='field'>
        <input type="text" onChange={handleChange} name="autor" autoComplete='off' required value={input.autor}/>
        <label className='label-wrapper'>
        <span className='label-text'>Autor</span>
        </label>
        </div>
        {error.autor && (<p className="errors">{error.autor}</p>)}

        <div className='field'>
        <input type="text" onChange={handleChange} name="image" autoComplete='off' required value={input.image}/>
        <label className='label-wrapper'>
        <span className='label-text'>Image</span>
        </label>
        </div>
        {error.image && (<p className="errors">{error.image}</p>)}

        <div className='field'>
      <input type="number" onChange={handleQuantityChange} value={videosQuantity} autoComplete='off' required/>
        <label className='label-wrapper'>
        <span className='label-text'>Videos Quantity</span>
        </label>
        </div>
        {error.images && (<p className="errors">{error.images}</p>)}
        <div className='inputs-images'>
      {input.images.slice(0, videosQuantity).map((image, index) => (
        <div className='inputs-images__children' key={index}>

          <div className="field">
          {/* {
            <h4>{`video: ${index + 1}`}</h4>
          } */}
          <input
            type="text"
            name="title"
            value={image.title}
            onChange={e => handleCourses(e, index)}
            // className='field-child'
          />
        <label className='label-wrapper'>
          <span className='label-text'>Title</span>
        </label>
        </div>

          <div className="field">
          <input
            type="text"
            name="description"
            value={image.description}
            onChange={e => handleCourses(e, index)}
          />
        <label className='label-wrapper'>
          <span className='label-text'>Description</span>
        </label>
        </div>
          <div className="field">
          <input
            type="text"
            name="video"
            value={image.video}
            onChange={e => handleCourses(e, index)}
          />
        <label className='label-wrapper'>
          <span className='label-text'>Video</span>
        </label>
          </div>
        </div>
      ))}
    </div>

        <div className='field'>
        <input type="text" onChange={handleChange} name="title" value={input.title} autoComplete='off' required/>
        <label className='label-wrapper'>
        <span className='label-text'>Title Course</span>
        </label>
        </div>
        {error.title && (<p className="errors">{error.title}</p>)}

        <div className='field'>
        <input type="text" onChange={handleChange} name="github" value={input.github} autoComplete='off' required/>
        <label className='label-wrapper'>
        <span className='label-text'>Github Channel</span>
        </label>
        </div>

        {error.github && (<p className="errors">{error.github}</p>)}

        <div className='field'>
        {/* <label>Documentation url: </label> */}
        <input type="text" onChange={handleChange} name="documentation" value={input.documentation} autoComplete='off' required/>
        <label className='label-wrapper'>
        <span className='label-text'>Documentation URL</span>
        </label>
        </div>
        {error.documentation && (<p className="errors">{error.documentation}</p>)}

        <div className='field'>
        <textarea rows='7' onChange={handleChange} name="description" value={input.description} autoComplete='off' required/>
        <label className='label-wrapper'>
        <span className='label-text'>Description</span>
        </label>
        </div>
        {error.description && (<p className="errors">{error.description}</p>)}

        <div className='input-checkbox'>

        <label>Category: </label><br/>

        <div className='input-checkbox__children'>

        <div className='label-checkbox'>
        <label>Frontend</label>
        <input type="Checkbox" onChange={handleClick} value="Frontend"/>
        </div>

        <div className='label-checkbox'>
        <label>Backend</label>
        <input type="Checkbox" onChange={handleClick} value="Backend"/>
        </div>

        <div className='label-checkbox'>
        <label>Others</label>
        <input type="Checkbox" onChange={handleClick} value="Others"/>
        </div>

        </div>

        </div>

        <div className='btn-form'>
        <button onClick={(e) => handleSubmit(e)}>Crear Course</button>
        </div>
      </form>
      <Toaster
                position='bottom-right'
                reverseOrder={true}
                toastOptions={{
                  className: '',
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: 'white',
                    fontSize: '15px'
                  }
                }}
              />
    </div>
  )
}

export default FormCourse
