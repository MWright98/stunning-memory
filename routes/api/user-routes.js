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
    .route('/:id/friends/:friendId')
    .delete(removeFriend);

router
    .route('/:id')
    .post(addFriend)
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);





module.exports=router;