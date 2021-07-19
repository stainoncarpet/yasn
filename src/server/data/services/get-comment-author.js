const {User} = require("../mongo/entities/User/User-model.js");

const getCommentAuthor = async (parent, args, context, info) => {
    const user = await User.findById(parent.author);

    try {
        return {id: user._id, fullName: user.fullName, userName: user.userName, avatar: user.avatar};
    } catch (error) {
        return null;
    }
};

module.exports = {getCommentAuthor};