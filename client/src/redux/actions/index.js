import axios from "axios"
import {toast} from "react-hot-toast";

export function getAllVideos(){
    return function(dispatch){
        console.log(axios)
        axios.get("/videos")
        .then((res) => res.data)
        .then((res) => {
            return dispatch({type: "GET_ALL_VIDEOS", payload: res})
        })
        .catch(error => console.log(error.message))
                     
    }
} 

export function getCourseByName(name){
    return async function(dispatch){
        try{
            const courseName = await axios.get(`/videos?name=${name}`)
            console.log(courseName)
            return dispatch({type: "GET_COURSE_BY_NAME", payload: courseName.data})
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            const detail = await axios.get(`/videos/${id}`)
            return dispatch({type: "GET_DETAIL", payload: detail.data})
        }catch(error){
            console.log(error.message)
        }
    }
} 

export function detailNull(){
    return {
        type: "DETAIL_NULL",   
    }
}

export function postCourse(post){
    return async function(dispatch){
        try{
            const response = await axios.post("/videos", post)         
            toast.success("Curso creado correctamente")
            return dispatch({type: "POST_COURSE", payload: response.data})         
        }catch(error){
            toast.error("Error al crear el curso")
        }
    }
}

export function deleteCourse(id){
    return async function(dispatch){
        try{          
            await axios.delete(`/delete/${id}`)          
            return dispatch({type: "DELETE_COURSE", payload: id})
        }catch(error){
            console.log(error.message)
        }
    }
}