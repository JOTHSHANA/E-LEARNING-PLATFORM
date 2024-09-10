const express = require('express');
const router = express.Router();
const { PostUser } = require('../controllers/auth/auth');

router.post('/add-user', async (req, res) => {
        const user = req.body; 
        const result = await PostUser(user);
      
        if (result.status === 'error') {
          return res.status(400).json({ message: result.message });
        }
      
        res.status(201).json({ message: 'User created successfully', user: result.user });
      });

      module.exports = router