const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const morgan = require('morgan');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authenticateJWT = require('./middleware/authenticate')

// const { User, Course } = require('./models')
const courseRoutes = require('./routes/course/courses')
const authRouters = require('./routes/auth/auth')
const regCourseRoutes = require('./routes/regCourse/regCourse')
const recommendCourses = require('./routes/regCourse/recommed')
const topic = require('./routes/course/topic')
const content = require('./routes/course/content')
const Questions = require('./routes/questions/questions')
const Forum = require('./routes/forum/post')
const Compiler = require('./routes/compiler/compile')

const app = express();
const PORT = process.env.HOST_PORT;
app.use(session({
  secret: process.env.SESSION_SECRET || 'someSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

const cors_config = {
  origin: ['http://localhost:5173', 'https://techlehren-frontend.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(cors_config));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api', authRouters)
// app.use(authenticateJWT)
app.use('/api', courseRoutes);
app.use('/api', regCourseRoutes)
app.use('/api', recommendCourses)
app.use('/api', topic)
app.use('/api', content)
app.use('/api',Questions)
app.use('/api',Compiler)
app.use('/api/posts', Forum)

const startServer = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync(
      // {alter:true}
    );
    console.log('Models synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer(); 