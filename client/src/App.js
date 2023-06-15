import {Route, Routes} from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation"
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import VideoCourse from './components/VideoCourse/VideoCourse';
import Landing from './components/Landing/Landing';
import FormCourse from './components/FormCourse/FormCourse';
import axios from 'axios';
axios.defaults.baseURL = 'https://courses-app-production-d242.up.railway.app/';

function App() {

  return (
    <div className="App">  

      <Navigation /> 

    <Routes>
      
      <Route exact path="/" element={<Landing />} /> 
      <Route exact path="/home" element={<Home />} />  
      <Route path="/home/videos/:id" element={<Detail />} />
      <Route path="/home/videos/:id/:idVideo" element={<VideoCourse/>}/>
      <Route path="/home/form" element={<FormCourse />} />

    </Routes>


    </div>
  );
}

export default App;
