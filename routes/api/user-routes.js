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

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route(':id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports=router;