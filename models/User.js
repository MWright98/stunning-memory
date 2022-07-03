//Mongoose and Date Format util import
const { Schema, model, Types } = require('mongoose');
const {Thought, ThoughtSchema} = require('./Thought');

//Email validation function
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Schema for the creation of Users
const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{type: Schema.call(ThoughtSchema)}],
        friends: [{
            type: Schema.call(this)
          }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//Create virtual to track number of friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

//Create User model using the UserSchema
const User = model('User', UserSchema);

//Export User model
module.exports= User;