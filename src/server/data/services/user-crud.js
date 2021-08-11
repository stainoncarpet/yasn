const jwt = require("jsonwebtoken");
const util = require("util");

const { User } = require("../mongo/entities/User/User-model.js");
const { Notification } = require("../mongo/entities/Notification/Notification-model.js");
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
                            });        

        const friends = user.friendships.map(({_id, user1, user2, friendshipStatus, dateOfFormation}) => {
            const friend = user1.userName.toLowerCase() === userName.toLowerCase() ? user2 : user1;

            const statusObject = friendshipStatus === "friends" 
                                                            ? {status: friendshipStatus, fshipId: _id } 
                                                            : friendshipStatus === "pending"
                                                                ? {status: friendshipStatus, initiatorId: user1._id, fshipId: _id}
                                                                : {status: friendshipStatus} 
            
            return {user: friend, friendshipStatus: statusObject, dateOfFormation}
        });

        const trueFriends = friends.filter((f) => f.friendshipStatus.status === "friends");

        const friendshipStatusWithRequester = friends.find(({user}) => user._id?.toString() === requesterId)?.friendshipStatus;

        const data = {
            userInfo: {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                dateOfBirth: user.dateOfBirth,
                dateOfRegistration: user.dateOfRegistration,
                avatar: user.avatar,
                lastOnline: user.lastOnline,
                friendshipStatusWithRequester: friendshipStatusWithRequester
            },
            friends: {
                totalFriendsCount: trueFriends.length,
                selection: trueFriends
            },
            posts: user.posts
        }

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getFriends = async (userName) => {
    const friends = await User.find().select("_id fullName userName avatar");

    return friends.filter((user) => user.userName.toLowerCase() !== userName.toLowerCase());
};

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

        return true;
    } catch (error) {
        console.log(error);
        
        return false;
    }
};

const cancelFriendship = async (fshipId, cancelerToken) => {
    try {
        const decoded = await util.promisify(jwt.verify)(cancelerToken, process.env.JWT_SECRET);

        const canceledFriendsip = await Friendship.findByIdAndDelete(fshipId);
        
        const originUser = await User.findById(decoded.id);
        originUser.friendships = originUser.friendships.filter((fship) => fship.toString() !== fshipId);
        await originUser.save();

        const targetUserId = decoded.id === canceledFriendsip.user1.toString() ? canceledFriendsip.user2 : canceledFriendsip.user1
        const targetUser = await User.findById(targetUserId);
        targetUser.friendships = targetUser.friendships.filter((fship) => fship.toString() !== friendshipId);
        await targetUser.save();

        console.log(canceledFriendsip);

        return canceledFriendsip;
    } catch (error) {
        console.log(error);

        return null;
    }
};

const acceptFriendRequest = async (fshipId, accepterToken) => {
    try {
        const decoded = await util.promisify(jwt.verify)(accepterToken, process.env.JWT_SECRET);

        const friendship = await Friendship.findById(fshipId);

        friendship.friendshipStatus = "friends";

        await friendship.save();

        return friendship;
    } catch (error) {
        console.log(error);

        return null;
    }
};

const rejectFriendRequest = async (fshipId, rejecterToken) => {
    try {
        return await cancelFriendship(fshipId, rejecterToken);
    } catch (error) {
        console.log(error);
        return null;
    }
};

const withdrawFriendRequest = async (fshipId, withdrawerToken) => {
    try {
        return await cancelFriendship(fshipId, withdrawerToken);
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getEvents = async (userId, skip = 0, limit = 0, isUnreadOnly = false) => {
    try {
        const filterBy = isUnreadOnly ? {owner: userId, isRead: false} : {owner: userId};
        const events = await Notification.find(filterBy).skip(skip).limit(limit);

        return events;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const markEventAsRead = async (userId, eventId) => {
    try {
        const event = await Notification.findById(eventId);

        const user = await User.findById(userId);

        if(user.notifications.includes(event._id)){
            event.isRead = true;
            await event.save();

            return {isMarked: true, eventId: eventId};
        }

        return {isMarked: false, eventId: eventId};
    } catch (error) {
        console.log(error);
        return {isMarked: false, eventId: eventId};
    }
};

module.exports = { getUserProfile, getFriends, requestFriendship, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest, getEvents, markEventAsRead };