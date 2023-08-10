const {Videos} = require('../db')
const videos = require('../videos.json')


const getAllVideos = async () => {

    for (const el of videos) {

        const images =JSON.stringify(el.images);

        await Videos.findOrCreate({
            where: {image: el.image, images: images, category: el.category, title: el.title, autor: el.autor, description: el.description, github: el.github, documentation: el.documentation},
        });
    }

        const allVideos = await Videos.findAll();
        return allVideos;   
    }
        
        
    module.exports = {getAllVideos}

// const fs = require('fs');
// const path = require('path');
// const { Videos } = require('../db')

// const getAllVideos = async () => {
//     try {
//         // Leer el archivo JSON
//         const filePath = path.join(__dirname, '../videos.json');
//         const data = fs.readFileSync(filePath, 'utf-8');
//         const videos = data
    
//         for (const el of videos) {
//             const images =JSON.stringify(el.images);
//             await Videos.findOrCreate({
//                 where: {image: el.image, images: images, category: el.category, title: el.title, autor: el.autor, description: el.description, github: el.github, documentation: el.documentation},
//                 });
//         }

//         const allVideos = await Videos.findAll();
//         return allVideos;
    
//       } catch (error) {
//         console.error('Error al guardar los videos', error);
//         throw Error(`Error: ${error}`)
//       } 
//   };

//   module.exports = {getAllVideos}
  