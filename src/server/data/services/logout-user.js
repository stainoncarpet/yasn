const { User } = require("../mongo/entities/User/User-model.js");
const { generateToken } = require("./generate-token.js");

const logoutUser = async (parent, args, context, info) => {
    const {id, authToken} = args;
    try {
        const user = await User.findById(id);

        if(user) {
            user.authTokens = user.authTokens.filter((token) => token !== authToken);
            await user.save();
            
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);

        return false
    }
};

module.exports = {logoutUser};