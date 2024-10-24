const express = require('express');
const router = express.Router();
const passport = require('passport')
const { PostUser } = require('../../controllers/auth/auth');
const {LoginUser} = require('../../controllers/auth/allowuser')
const {encryptData, setEncryptedCookie} = require('../../config/encrypt')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

require('../../controllers/auth/passport')

router.post('/add-user', async (req, res) => {
  const user = req.body;
  if(!user.email || !user.username){
    return res.status(400).json({error:"email and username is required..."})
  }
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
    
      res.status(200).json({ message: result.message, user: result.user, token: result.token });
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL+'/login' }),
  (req, res) => {
    const { name, email, profilePhoto, token } = req.user;

    setEncryptedCookie(res, 'userData', {
      name,
      email,
      profilePhoto,
      token
    });

    res.redirect(process.env.CLIENT_URL+'/dashboard'); 
}
);


module.exports = router;
