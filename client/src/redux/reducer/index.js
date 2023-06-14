const initialState = {
   allVideos : [],
   detail: {}
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_ALL_VIDEOS":
            return{
                ...state,
                allVideos: action.payload,
            }

        case "GET_COURSE_BY_NAME" :  
            return {
                ...state,
                allVideos: action.payload
        }    

        case "GET_DETAIL" : 
            return {
                ...state,
                detail: action.payload
        }

        case "POST_COURSE" : 
        const courses = state.allVideos
        return {
            ...state,
            allVideos: [...courses, action.payload]
        }

        case "DELETE_COURSE":
            const course = state.allVideos
            return{
                ...state,
                allVideos: course.filter(e => e.id !== action.payload)
        }

        case "DETAIL_NULL" : 
        return {
            ...state,
            detail: {}
        }

            default :
            return {
                ...state
            }
        }
    }

  export default rootReducer;