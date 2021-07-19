const jwt = require("jsonwebtoken");

const { User } = require("../mongo/entities/User/User-model.js");

const validateAuthCredentials = async (parent, args, context, info) => {
    try {
        const user = await User.findById(args.id);

        if (user) {
            const isTokenLinkedToProfile = user.authTokens.includes(args.authToken);

            if(isTokenLinkedToProfile) {
                jwt.verify(args.authToken, process.env.JWT_SECRET);

                return {userId: user._id, authToken: args.authToken, avatar: user.avatar}
            }
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
    
};

module.exports = {validateAuthCredentials};