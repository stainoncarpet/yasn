const { User } = require("../mongo/entities/User/User-model.js");

// All users for now
const getFriends = async (userName) => {
    const friends = await User.find().select("_id fullName userName avatar");

    return friends.filter((user) => user.userName.toLowerCase() !== userName.toLowerCase());
}

module.exports = {getFriends};