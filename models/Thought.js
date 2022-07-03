//Mongoose and Date Format util import
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Schema for reactions
const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

//Schema for thoughts
  const ThoughtSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true
      },
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 128
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReactionSchema to validate data for a reaction
      reactions : [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

//Create virtual to track number of reactions to a thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//Create thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//Export Thought Model and Schema
module.exports = [Thought, ThoughtSchema];