const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const saltRounds = 10;
const PostUser = async (user) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: user.email },
          { username: user.username }
        ],
      },
    });

    if (existingUser) {
      return { status: 'error', message: 'User with this email or username already exists' };
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = await User.create({...user, password: hashedPassword,});

    return { status: 'success', user: newUser };

  } catch (err) {
    return { status: 'error', message: 'Error inserting user: ' + err.message };
  }
};

module.exports = {
  PostUser,
};
