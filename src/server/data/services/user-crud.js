const jwt = require("jsonwebtoken");
const util = require("util");

const { User } = require("../mongo/entities/User/User-model.js");
const { Notification } = require("../mongo/entities/Notification/Notification-model.js");
const { Friendship } = require("../mongo/entities/Friendship/Friendship-model.js");
const {extractFriendsFromFriendships} = require("../services/utils.js");

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

        const friends = extractFriendsFromFriendships(user.friendships, userName);

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

// of logged in user, extensive list with pending, etc
const getFriends = async (userId) => {
    try {
        const user = await User.findById(userId);
        const friendshipsOfUser = await Friendship.find({ $or: [ { user1: userId }, { user2: userId } ] })
            .populate({
                path: "user1 user2",
                select: "_id fullName userName avatar"
            });

        const friends = extractFriendsFromFriendships(friendshipsOfUser, user.userName);

        return friends;
    } catch (error) {
        console.log(error);
    }
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

        const notificationForRequestTarget = await Notification.create({
            type: "frequest-received",
            dateOfCreation: new Date(),
            isRead: false,
            owner: targetUser._id,
            content: JSON.stringify([{
                type: "link",
                href: `/profile/${originUser.userName.toLowerCase()}`,
                anchor: originUser.fullName + " "
            }, {
                type: "text",
                content: "sent you a friend request"
            }
            ]),
            linkedEntity: {
                entityType: "Friendship",
                entityId: friendship._id,
            }
        });

        targetUser.notifications = [...targetUser.notifications, notificationForRequestTarget];
        await targetUser.save();

        // dont forget to add notification to user's list

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
        
        const canceler = await User.findById(decoded.id);
        canceler.friendships = canceler.friendships.filter((fship) => fship.toString() !== fshipId);
        await canceler.save();

        const targetUserId = decoded.id === canceledFriendsip.user1.toString() ? canceledFriendsip.user2 : canceledFriendsip.user1;
        const targetUser = await User.findById(targetUserId);
        targetUser.friendships = targetUser.friendships.filter((fship) => fship.toString() !== fshipId);
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
        const {id} = await util.promisify(jwt.verify)(accepterToken, process.env.JWT_SECRET);

        const friendship = await Friendship.findById(fshipId);

        friendship.friendshipStatus = "friends";

        await friendship.save();

        const accepter = await User.findById(id).populate("notifications");

        const notificationForFriendshipInitiator = await Notification.create({
            type: "frequest-accepted",
            dateOfCreation: new Date(),
            isRead: false,
            owner: friendship.user1,
            content: JSON.stringify([{
                type: "link",
                href: `/profile/${accepter.userName.toLowerCase()}`,
                anchor: accepter.fullName + " "
            }, {
                type: "text",
                content: "accepted your friend request"
            }
            ]),
            linkedEntity: {
                entityType: "Friendship",
                entityId: fshipId
            }
        });

        const n = accepter.notifications.find(({linkedEntity}) => linkedEntity.entityType === "Friendship" && linkedEntity.entityId.toString() === fshipId);
        const forceReadNotification = await Notification.findById(n._id);
        forceReadNotification.isRead = true;
        await forceReadNotification.save();

        const initiator = await User.findById(friendship.user1);
        initiator.notifications = [...initiator.notifications, notificationForFriendshipInitiator];
        await initiator.save();

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

const getUnreadEvents = async (userId, skip = 0, limit = 0) => {
    try {
        const events = await Notification.find({owner: userId, isRead: false}).sort({dateOfCreation: -1});

        const unreadNotificationsCount = (await Notification.count({owner: userId, isRead: false, type: "post-commented"}));

        const unreadFRequestsCount = (await Notification.count({owner: userId, isRead: false, type: {$in: ["frequest-sent", "frequest-received", "frequest-accepted"]}}));

        const unreadMessagesCount = 0;

        return {events, unreadNotificationsCount, unreadFRequestsCount, unreadMessagesCount};
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDataByType = async (userId, skip = 0, limit = 0, types = []) => {
    try {
        const carcass = {friends: null, conversations: null, notifications: null};

        // notification and request function types are different
        if(types.includes("notification")) {
            const notifications = await Notification.find({owner: userId, type: "post-commented"}).skip(skip).limit(limit).sort({dateOfCreation: -1});
            carcass.notifications = notifications;
        }
        
        return carcass;
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

module.exports = { getUserProfile, getFriends, requestFriendship, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest, getUnreadEvents, getDataByType, markEventAsRead };