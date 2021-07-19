const jwt = require('jsonwebtoken');

// payload: { id: user._id, email: user.email })
const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    
    return token;
};

module.exports = {generateToken};