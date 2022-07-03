//Import user model
const User = require('../models/User');

//Import thought model and schema 
const [Thought, ThoughtSchema] = require('../models/Thought')

//function to push thoughts to their associated user
const pushThoughts = (body, res)=>  {
   
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: { _id: res._id } } },
        { new: true }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
}


//Controller for thought routes
const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },
    //GET one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },
    //Create a new thought    
    createThought({body}, res) {
        Thought.create(body)
            
            .then(()=> setTimeout(dbThoughtData => res.json(dbThoughtData)), 100)
            .then(pushThoughts(body, res))
            .catch(err => res.json(err));
            
            
    },
    //Update an existing thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                //validate that there is data to update the thought with, if not respond with 404, else return updated object
                if (!dbThoughtData) {
                    res.status(404).json({message:'No thought found with this id!'})
                    return
                }
                res.json(dbThoughtData)
                
            })
            
            .catch(err => res.status(400).json(err));
    },
    //Delete an existing thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    //Add a reaction to an existing thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.id },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
      // remove reply
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.id },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },
};

//Export thought controller for use in router
module.exports=thoughtController;
