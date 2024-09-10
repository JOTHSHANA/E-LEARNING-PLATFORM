const express = require('express');
const sequelize = require('./config/database'); 
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.DB_PORT;

app.use(express.json());

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
  

