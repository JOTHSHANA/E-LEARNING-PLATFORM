const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Op } = require('sequelize');

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
    return { status: 'success', message: 'Login successful', user };
    
  } catch (err) {
    return { status: 'error', message: 'Error during login: ' + err.message };
  }
};

module.exports = {
  LoginUser,
};
