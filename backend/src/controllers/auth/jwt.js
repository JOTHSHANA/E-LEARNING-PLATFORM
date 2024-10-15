const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const generateToken = (user) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    return jwt.sign({
        username: user.username,
        email: user.email,
        name: user.name,
        profilePhoto: user.profilePhoto, // All necessary details are passed here
    }, process.env.SECRET_KEY, { expiresIn: '12h' }); // The token expires in 12 hours
};

module.exports = generateToken; 
