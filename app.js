const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const moment = require('moment');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/posts');
const MongoConnection = require('./lib/mongoConnection');
const scheduleFunction = require('./lib/scheduler');
const fetchData = require('./lib/fetchData');
const Post = require('./models/postModel');

// Connect to MongoDB
const dbConnection = new MongoConnection();
dbConnection.connect();

// Fetch and update the database with posts from hacker news
const updateDatabase = async () => {
  try {
    const data = await fetchData();
    // Mark deleted as false, before insertion.
    const posts = data.map(post => Object.assign({}, post, { deleted: false }));
    await Post.insertMany(posts, { ordered: false });
  } catch (error) {
    console.log('Error Updating database:', error.toString());
  }
};
// Start the scheduling of data fetching.
const hour = 60 * 60 * 1000; // milli
scheduleFunction(updateDatabase, hour);

// Initialize express
const app = express();
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Access moment from templates rendered within the app
app.locals.moment = moment;
// app.use(logger('dev'));
// Get JSON from req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Share static files
app.use(express.static(path.join(__dirname, 'public')));
// Register routes
app.use('/', indexRouter);
app.use('/posts', postRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port: ${port}`); });
