const { User } = require('../../models');

const getUserDetails = async (email) => {
  try {
    const details = await User.findOne({
      where: {
        email:email, 
        status: '1'
      }
    });

    if (!details) {
      throw new Error('User not found');
    }

    return {
        id: details.id,
      name: details.name,
      email: details.email,
      token: details.token 
    };
  } catch (err) {
    throw new Error(`Error fetching user details: ${err.message}`);
  }
};

module.exports = {
  getUserDetails
};
