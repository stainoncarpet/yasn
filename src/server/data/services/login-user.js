const bcrypt = require("bcrypt");

const { User } = require("../mongo/entities/User/User-model.js");
const { generateToken } = require("./generate-token.js");

const loginUser = async (parent, args, context, info) => {
    const {email, password} = args;
    try {
        const user = await User.findOne({email: email});
        let isPasswordCorrect;

        if(user) {
            isPasswordCorrect = await bcrypt.compare(password, user.password);
        } else {
            return {userId: null, authToken: null};
        }

        if (isPasswordCorrect) {
            const token = await generateToken({ id: user._id, email: user.email });
            user.authTokens = [...user.authTokens, token];

            await user.save();

            return {userId: user._id, authToken: token, avatar: user.avatar};
        } else {
            return {userId: null, authToken: null, avatar: null};
        }
    } catch (error) {
        console.error(error);

        return {userId: null, authToken: null, avatar};
    }
};

module.exports = {loginUser};