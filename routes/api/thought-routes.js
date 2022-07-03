//Import express router
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

// /api/thoughts routes to fetch all thoughts and create a new thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api/thoughts/id routes to get a single thought, update a thought, and delete a thought
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/id/reactions route to add a reaction to a thought
router
    .route('/:id/reactions')
    .post(addReaction)

// /api/thoughts/id/reactions/id route to delete a reaction
router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);



module.exports=router;

//CRUD
//Create POST a thought
//Read GET thoughts
//Update PUT thoughts
//Delete DELETE thoughts

