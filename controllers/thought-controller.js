const User = require('../models/User');

const [Thought, ThoughtSchema] = require('../models/Thought')

const pushThoughts = (body, res)=>  {
   
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: { _id: res._id } } },
        { new: true }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
}



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
    
    
    createThought({body}, res) {
        Thought.create(body)
            // .then(pushThoughts())
            .then(()=> setTimeout(dbThoughtData => res.json(dbThoughtData)), 100)
            .then(pushThoughts(body, res))
            .catch(err => res.json(err));
            
            
    },
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
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
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

module.exports=thoughtController;
