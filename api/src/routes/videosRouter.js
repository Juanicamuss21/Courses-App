const express = require('express')

const router = express.Router();
const {getAllVideos} = require('../controllers/controlVideos')
const {Videos} = require('../db')

const filterVideosByName = async (videos, name) => {
    const videoName = await videos.filter(el =>
      el.title.toLowerCase().includes(name.toLowerCase())
    );
    return videoName;
  };

  router.get('/videos', async (req, res) => {
    try {
      const { name } = req.query;
      const videosTotal = await getAllVideos();
  
      if (name) {
        const filteredVideos = await filterVideosByName(videosTotal, name);
  
        if (filteredVideos.length) {
          res.status(200).send(filteredVideos);
        } else {
          res.status(400).send({ message: "No se encontraron resultados" });
        }
      } else {
        res.status(200).send(videosTotal);
      }
    } catch (error) {
      res.status(404).send(`Tipo de error: ${error}`);
    }
  });

router.get('/videos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const videosTotal = await getAllVideos();
        if(id){
            let videoId = await videosTotal.find(el => el.id === parseInt(id))
            
            videoId  ?
            res.status(200).send(videoId) : 
            res.status(400).send({message: "No existe"})
        }      
    }catch(error){
        res.status(400).send(error)
    }
});

router.post('/videos', async (req, res) => {
    try{
        const {autor, image, images, category, title, description, github, documentation} = req.body;

        const imagesConversion = JSON.stringify(images)

        const courseCreated = await Videos.create({         
            autor,
            image,
            images: imagesConversion,
            title,
            category,  
            description,
            github,
            documentation,
            createdForUser: true
        })

        res.status(200).send(courseCreated)
        
    }      
    catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const {id} = req.params
        const deleteCourse = await Videos.destroy({
            where: {id: id},
           })
           res.send("borrado con exito")

    }catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
});

// la última a la que va a llegar
router.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

module.exports = router;