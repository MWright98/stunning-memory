const router = require('express').Router();

//import methods from thought controller file
const{
    getAllThoughts, //GET all
    getThoughtById, //GET :id
    createThought, //POST 
    updateThought, //PUT :id
    deleteThought, //DELETE :id
    addReaction, //POST reaction
    removeReaction, //DELETE reaction 
    pushThoughts
} = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:id/reactions')
    .post(addReaction)

router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);



module.exports=router;

//CRUD
//Create POST a thought
//Read GET thoughts
//Update PUT thoughts
//Delete DELETE thoughts

