const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log(process.env.SECRET_KEY)
const generateToken = (user) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    return jwt.sign({
        username: user.username,
        email: user.email,
        name:user.name,
        profilePhoto: user.profilePhoto,
    }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

module.exports = generateToken; 
