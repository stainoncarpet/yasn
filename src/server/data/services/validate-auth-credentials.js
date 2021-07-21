const jwt = require("jsonwebtoken");

const { User } = require("../mongo/entities/User/User-model.js");

const validateAuthCredentials = async (parent, args, context, info) => {
    const {id, authToken} = args;

    try {
        const user = await User.findById(id);

        if (user) {
            const isTokenLinkedToProfile = user.authTokens.includes(authToken);

            if(isTokenLinkedToProfile) {
                jwt.verify(authToken, process.env.JWT_SECRET);

                return {userId: user._id, authToken: authToken, avatar: user.avatar}
            }
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
    
};

module.exports = {validateAuthCredentials};