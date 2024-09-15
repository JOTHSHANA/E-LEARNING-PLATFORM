const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const cors = require('cors');

const { User, Course } = require('./models')
const courseRoutes = require('./routes/courses')
const authRouters = require('./routes/auth')

const app = express();
const PORT = process.env.DB_PORT;
app.use(cors());

app.use(express.json());

// routes
app.use('/api', courseRoutes);
app.use('/api', authRouters)


const startServer = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync(); 
    console.log('Models synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


