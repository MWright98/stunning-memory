//Import express router
const router = require('express').Router();

//import methods from user controller file
const{
    getAllUsers, //GET
    getUserById, //GET :id
    createUser, //POST
    updateUser, //PUT :id
    deleteUser, //DELETE :id
    addFriend, //POST friend :id
    removeFriend //DELETE friend :id
} = require('../../controllers/user-controller');

// /api/users/id/friends/id route to delete a friend
router
    .route('/:id/friends/:friendId')
    .delete(removeFriend);

// /api/users/id routes to add friends, get a single user, update a user, and delete a user
router
    .route('/:id')
    .post(addFriend)
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    
// api/users routees to get all users and create new users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//Export router
module.exports=router;