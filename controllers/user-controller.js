//Import user and thought models
const {User, Thought} = require('../models');

//User route controller
const userController = {
  //Get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },
    //Get one user by their id
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },
    //Create a new user
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },
    //Update an existing user
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message:'No user found with this id!'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
            
    },
    //Delete an existing user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData=> res.json(dbUserData))
            .catch(err => res.json(err))
    },
    //Add a friend to an existing user's friends list
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $push: { friends: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      // Remove a friend from a user's friends list by id
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: { _id: params.friendId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

}

//export user controller for use in router
module.exports=userController;