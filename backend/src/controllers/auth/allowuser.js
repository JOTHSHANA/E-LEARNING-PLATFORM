const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { Op } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const secret_key = process.env.SECRET_KEY;
console.log(secret_key)

const LoginUser = async (username, password) => {
  try {
    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username }, 
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );

    return {
      status: 'success',
      message: 'Login successful',
      user,
      token 
    };
    
  } catch (err) {
    return { status: 'error', message: 'Error during login: ' + err.message };
  }
};

module.exports = {
  LoginUser,
};
