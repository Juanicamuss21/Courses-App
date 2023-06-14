const axios = require('axios')
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

  