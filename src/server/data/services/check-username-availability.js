const { User } = require("../mongo/entities/User/User-model.js");

const checkUserNameAvailability = async (parent, args, context, info) => {
    const user = await User.findOne({userName: args.userName});

    if (user) {
        return false; // false - name is already taken and not available
    } else {
        return true;
    }
};

module.exports = {checkUserNameAvailability};