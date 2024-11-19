const express = require('express');
const router = express.Router();
const passport = require('passport')
const { OAuth2Client } = require('google-auth-library');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken'); 
const { PostUser } = require('../../controllers/auth/auth');
const {LoginUser} = require('../../controllers/auth/allowuser')
// const {encryptData, setEncryptedCookie} = require('../../config/encrypt')
const path = require('path');
const {getUserDetails} = require('../../controllers/auth/find')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

require('../../controllers/auth/passport')
const secretKey = process.env.SECRET_KEY;

const encrypt = (payload) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
  return ciphertext;
};

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

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const client = new OAuth2Client(process.env.CLIENT_ID);
const jwtSecret = process.env.JWT_SECRET;

router.post('/auth/google/callback', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const tokenId = authorization.split(' ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, picture } = payload;
    console.log("Email from Google payload:", email);


    const user = await getUserDetails(email);
    console.log("Hiii",user)

    if (!user) {
      return res.status(404).json({ message: 'User not found in the database.' });
    }

    const tokenData = {
      id:user.id,
      name: user.name,
      gmail: user.email,
      profile: picture,
    };

    const jwtToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, 
        email: user.email,
      },
      jwtSecret
    );

    tokenData.token = jwtToken;

    const encryptedToken = encrypt(tokenData);

    return res.status(200).json({
      message: 'Login successful',
      d: encryptedToken,
    });
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
});


module.exports = router;
