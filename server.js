//Import mongoose and express
const mongoose = require('mongoose');
const express = require('express');

//intialize express app
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('./routes'));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);

//initialize server 
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
