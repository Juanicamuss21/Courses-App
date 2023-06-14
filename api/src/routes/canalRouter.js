 const express = require('express')

 const router = express.Router();
 
 router.get('/recipes', async (req, res) => {
    try{
        const {name} = req.query;
        const recipesTotal = await getAllInfo();
        if(name){
            let recipesName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            recipesName.length ? 
            res.status(200).send(recipesName) :
            res.status(404).send("No se encontro la receta")
        }
        else{
            res.status(200).send(recipesTotal)
        }
    }catch(error){
        res.status(404).send(error.msg)
    }
})

router.get('/recipes/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const recipesTotal = await getAllInfo();
        if(id){
            let recipedId = recipesTotal.find(el => el.id === parseInt(id));
            recipedId ? res.status(200).send(recipedId) :
            res.status(404).send("No se encontro la receta")
        }
    }catch(e){
        res.status(404).send(e.msg)
    }
});

router.post('/recipes', async (req, res) => {
    try{
       const {name, dish_summary, health_level, steps, image, diets} = req.body;

       await getInfoDiet();

       let recipeCreated = await Recipe.create({
        name,
        dish_summary,
        health_level,
        steps,
        image
       })

       let dietsDb = await Diet.findAll({
        where: {name: diets}
       })

       recipeCreated.addDiet(dietsDb)

    //    await recipeCreated.addDiet(id_diets)
       const newRecipe = await Recipe.findOne({
        where: {name: name},
        include: {model: Diet}
       })

       res.status(200).send(newRecipe)
    }catch(error){
        res.status(404).send(`Error: ${error}`)
    }
})


 module.exports = router;