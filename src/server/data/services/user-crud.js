const jwt = require("jsonwebtoken");
const util = require("util");

const { User } = require("../mongo/entities/User/User-model.js");
const { Friendship } = require("../mongo/entities/Friendship/Friendship-model.js");

const getUserProfile = async (userName, requesterId) => {
    try {
        const user = await User
                            .findOne({userName: { '$regex': new RegExp(['^', userName, '$'].join(""), 'i') }})
                            .select("posts _id fullName userName dateOfBirth avatar dateOfRegistration lastOnline friendships")
                            .populate({
                                path: "posts", 
                                populate: {
                                    path: "author",
                                    select: "_id fullName userName avatar"
                                },
                                options: {
                                    sort: {
                                        dateOfPublication: -1
                                    }
                                },
                            })
                            .populate({
                                path: "friendships",
                                populate: {
                                    path: "user1 user2",
                                    select: "_id fullName userName avatar"
                                }
                            })
                            ;

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getFriends = async (userName) => {
    const friends = await User.find().select("_id fullName userName avatar");

    return friends.filter((user) => user.userName.toLowerCase() !== userName.toLowerCase());
};

// NEED AUTH FIRST
const requestFriendship = async (targetUserName, senderToken) => {
    try {
        const decoded = await util.promisify(jwt.verify)(senderToken, process.env.JWT_SECRET);
        
        const originUser = await User.findById(decoded.id);
        const targetUser = await User.findOne({userName: targetUserName});

        const friendship = await Friendship.create({user1: originUser, user2: targetUser});

        originUser.friendships.push(friendship);
        targetUser.friendships.push(friendship);

        await originUser.save();
        await targetUser.save();

        console.log("friend quest registered");

        return true;
    } catch (error) {
        console.log(error);
        
        return false;
    }
};

module.exports = { getUserProfile, getFriends, requestFriendship };