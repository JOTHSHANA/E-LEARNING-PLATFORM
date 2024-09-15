const express = require('express');
const router = express.Router();
const { PostUser } = require('../controllers/auth/auth');
const {LoginUser} = require('../controllers/auth/allowuser')

router.post('/add-user', async (req, res) => {
  const user = req.body;
  const result = await PostUser(user);

  if (result.status === 'error') {
    return res.status(400).json({ message: result.message });
  }

  res.status(201).json({ message: 'User created successfully', user: result.user });
});

router.post('/login', async(req, res)=>{
    const {username, password} = req.body
    const result = await LoginUser(username, password)
    if (result.status === 'error') {
        return res.status(400).json({ message: result.message });
      }
    
      res.status(200).json({ message: result.message, user: result.user });
})


module.exports = router;
