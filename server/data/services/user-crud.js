const jwt = require("jsonwebtoken");
const util = require("util");

const { User } = require("../mongo/entities/User/User-model.js");
const { Notification } = require("../mongo/entities/Notification/Notification-model.js");
const { Friendship } = require("../mongo/entities/Friendship/Friendship-model.js");
const { Conversation } = require("../mongo/entities/Conversation/Conversation-model.js");
const { Message } = require("../mongo/entities/Message/Message-model.js");
const { extractFriendsFromFriendships } = require("../services/utils.js");

const getUserProfile = async (userName, requesterId, dictionary) => {
    try {
        const user = await User
            .findOne({ userName: { '$regex': new RegExp(['^', userName, '$'].join(""), 'i') } })
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

        const friendshipStatusWithRequester = friends.find(({ user }) => user._id?.toString() === requesterId)?.friendshipStatus;

        const isUserOnline = JSON.stringify(Object.values(dictionary)).includes(user._id);

        const isFriends = friendshipStatusWithRequester && friendshipStatusWithRequester.status === "friends";

        const data = {
            userInfo: {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                dateOfBirth: user.dateOfBirth,
                dateOfRegistration: user.dateOfRegistration,
                avatar: user.avatar,
                lastOnline: isFriends ? (isUserOnline ? 0 : user.lastOnline) : null,
                friendshipStatusWithRequester: friendshipStatusWithRequester
            },
            posts: (user._id.toString() === requesterId || (isFriends)) ? user.posts : []
        };

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
        const friendshipsOfUser = await Friendship
            .find({ $or: [{ user1: userId }, { user2: userId }] })
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

const requestFriendship = async (targetUserName, originUserId) => {
    try {
        const originUser = await User.findById(originUserId);
        const targetUser = await User.findOne({ userName: targetUserName });

        const friendship = await Friendship.create({ user1: originUser, user2: targetUser });

        originUser.friendships.push(friendship);
        targetUser.friendships.push(friendship);

        const notificationForRequestTarget = await Notification.create({
            type: "frequest-received",
            dateOfCreation: new Date(),
            isRead: false,
            owner: targetUser._id,
            content: JSON.stringify([{
                type: "link",
                href: `/profile/${originUser.userName.toLowerCase()}`,
                anchor: originUser.fullName
            }, {
                type: "text",
                content: " sent you a friend request"
            }
            ]),
            linkedEntity: {
                entityType: "Friendship",
                entityId: friendship._id,
            }
        });

        targetUser.notifications = [...targetUser.notifications, notificationForRequestTarget];
        await targetUser.save();
        await originUser.save();

        return {
            targetUserId: targetUser._id,
            notification: notificationForRequestTarget,
            requester: {
                user: {
                    _id: originUser._id,
                    fullName: originUser.fullName,
                    userName: originUser.userName,
                    avatar: originUser.avatar
                },
                friendshipStatus: {
                    status: friendship.friendshipStatus,
                    fshipId: friendship._id,
                    initiatorId: originUser._id
                }
            }
        };
    } catch (error) {
        console.log(error);

        return null;
    }
};

const cancelFriendship = async (fshipId, userId, eventGist) => {
    try {
        const canceledFriendship = await Friendship.findByIdAndDelete(fshipId);

        const canceler = await User.findById(userId);
        canceler.friendships = canceler.friendships.filter((fship) => fship.toString() !== fshipId);
        await canceler.save();

        const targetUserId = userId === canceledFriendship.user1.toString() ? canceledFriendship.user2 : canceledFriendship.user1;
        const targetUser = await User.findById(targetUserId);
        targetUser.friendships = targetUser.friendships.filter((fship) => fship.toString() !== fshipId);

        let notificationForUnfriendingTarget;

        if(eventGist) {
            notificationForUnfriendingTarget = await Notification.create({
                type: "fship-canceled",
                dateOfCreation: new Date(),
                isRead: false,
                owner: targetUser._id,
                content: JSON.stringify([{
                    type: "link",
                    href: `/profile/${canceler.userName.toLowerCase()}`,
                    anchor: canceler.fullName
                }, {
                    type: "text",
                    content: " " + eventGist
                }
                ]),
                linkedEntity: {
                    entityType: "Friendship",
                    entityId: canceledFriendship._id,
                }
            });
    
            targetUser.notifications = [...targetUser.notifications, notificationForUnfriendingTarget];
        }

        await targetUser.save();

        console.log(canceledFriendship);

        return {fshipId: canceledFriendship._id, notification: notificationForUnfriendingTarget, targetUserId, requestRecipientId: canceledFriendship.user2};
    } catch (error) {
        console.log(error);

        return null;
    }
};

const acceptFriendRequest = async (fshipId, accepterId) => {
    try {
        const friendship = await Friendship.findById(fshipId);

        friendship.friendshipStatus = "friends";

        await friendship.save();

        const accepter = await User.findById(accepterId).populate("notifications");

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

        const n = accepter.notifications.find(({ linkedEntity }) => linkedEntity.entityType === "Friendship" && linkedEntity.entityId.toString() === fshipId);
        
        if(n) {
            const notificationToForceRead = await Notification.findById(n._id);
            notificationToForceRead.isRead = true;
            await notificationToForceRead.save();
        }

        const initiator = await User.findById(friendship.user1);
        initiator.notifications = [...initiator.notifications, notificationForFriendshipInitiator];
        await initiator.save();

        return { eventNotification: notificationForFriendshipInitiator, friendshipInitiatorId: initiator._id, newFriend: { _id: accepter._id, fullName: accepter.fullName, userName: accepter.userName, avatar: accepter.avatar, fshipStatus: friendship.friendshipStatus, fshipId: friendship._id } };
    } catch (error) {
        console.log(error);

        return null;
    }
};

const rejectFriendRequest = async (fshipId, rejecterId) => {
    try {
        return await cancelFriendship(fshipId, rejecterId, "rejected your friend request");
    } catch (error) {
        console.log(error);
        return null;
    }
};

const withdrawFriendRequest = async (fshipId, withdrawerId) => {
    try {
        const withdrawnFriendship = await cancelFriendship(fshipId, withdrawerId);

        const requestRecipient = await User.findById(withdrawnFriendship.requestRecipientId).populate("notifications");

        let removableNotificationId;
        const newArr = new Array();

        for (let i = 0; i < requestRecipient.notifications.length; i++) {
            if(requestRecipient.notifications[i].linkedEntity.entityId.toString() !== fshipId){
                console.log("!!! true ");
                newArr.push(lrequestRecipient.notifications[i]);
            } else {
                console.log("!!! false ", requestRecipient.notifications[i]._id);
                await Notification.findByIdAndDelete(requestRecipient.notifications[i]._id);
                removableNotificationId = requestRecipient.notifications[i]._id;
            }
        } 
        requestRecipient.notifications = newArr;

        await requestRecipient.save();

        return {fshipId: withdrawnFriendship.fshipId, removableNotificationId, targetUserId: withdrawnFriendship.requestRecipientId};
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUnreadEvents = async (userId, skip = 0, limit = 0) => {
    try {
        const user = await User.findById(userId).populate("conversations");

        const events = await Notification.find({ owner: userId, isRead: false }).sort({ dateOfCreation: -1 });

        const unreadNotificationsCount = (await Notification.countDocuments({ owner: userId, isRead: false, type: { $in: ["post-commented", "frequest-accepted"] } }));

        const unreadFRequestsCount = (await Notification.countDocuments({ owner: userId, isRead: false, type: { $in: ["frequest-sent", "frequest-received"] } }));

        let unreadMessagesCount = 0;

        for (let i = 0; i < user.conversations.length; i++) {
            const lastMessageInConversationId = user.conversations[i].messages[user.conversations[i].messages.length - 1];
            const lastMessageInConversation = await Message.findById(lastMessageInConversationId);

            if(lastMessageInConversation.speaker != userId && !lastMessageInConversation.isReadBy.includes(userId)) {
                unreadMessagesCount++;
            }
        }

        return { events, unreadNotificationsCount, unreadFRequestsCount, unreadMessagesCount };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getNotificationByType = async (userId, skip = 0, limit = 0, types = []) => {
    try {
        const carcass = { friends: null, conversations: null, notifications: null };

        // notification and request function types are different
        if (types.includes("notification")) {
            const notifications = await Notification.find({ owner: userId, type: { $in: ["post-commented", "frequest-accepted"] } }).skip(skip).limit(limit).sort({ dateOfCreation: -1 });
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

        if (user.notifications.includes(event._id)) {
            event.isRead = true;
            await event.save();

            return { isMarked: true, eventId: eventId };
        }

        return { isMarked: false, eventId: eventId };
    } catch (error) {
        console.log(error);
        return { isMarked: false, eventId: eventId };
    }
};

const startConversation = async (starterUserId, secondUserName) => {
    try {
        const participant1 = await User.findById(starterUserId);
        const participant2 = await User.findOne({ userName: { '$regex': new RegExp(['^', secondUserName, '$'].join(""), 'i') } });

        const possiblyExistingConversation = await Conversation.findOne({ participants: { $all: [participant1._id, participant2._id] } })

        if (possiblyExistingConversation) {
            console.log("conversation already exists");
            return possiblyExistingConversation;
        } else {
            console.log("creating new conversation");
            const carcass = { participants: [participant1._id, participant2._id], messages: [] };

            const conversation = await Conversation.create(carcass);

            participant1.conversations = [...participant1.conversations, conversation._id];
            participant2.conversations = [...participant2.conversations, conversation._id];

            await participant1.save();
            await participant2.save();

            return conversation;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const loadConversation = async (userId, conversationId) => {
    try {
        const conversation = await Conversation.findById(conversationId)
            .populate({
                path: "participants",
                select: "_id fullName userName avatar"
            })
            .populate({
                path: "messages",
                select: "_id speaker content dateOfTyping isReadBy",
                options: {
                    limit: 10,
                    sort: { 'dateOfTyping': -1 }
                },
                sort: "-1"
            })

        return conversation;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const loadMoreMessages = async (userId, conversationId, alreadyLoadedNumber = 10) => {
    try {
        const messages = await Message.find({ conversation: conversationId }, {}, { sort: { 'dateOfTyping': -1 }, skip: alreadyLoadedNumber, limit: 10 })
        return messages;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addMessageToConversation = async (senderToken, conversationId, messageContent) => {
    try {
        const { id: senderId } = await util.promisify(jwt.verify)(senderToken, process.env.JWT_SECRET);
        const speakerObject = await User.findById(senderId).select("_id fullName userName avatar");

        const conversation = await Conversation.findById(conversationId);

        if (conversation && conversation.participants.find((p) => senderId === p._id.toString()) && messageContent) {
            const newMessage = await Message.create({ conversation: conversationId, speaker: speakerObject._id, content: messageContent, dateOfTyping: new Date(), isReadBy: [] });
            conversation.messages = [...conversation.messages, newMessage];
            await conversation.save();
            
            newMessage._id = conversation.messages[conversation.messages.length - 1]._id;

            return [newMessage, conversation.participants];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getConversationsOverview = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate({
                path: "conversations",
                populate: {
                    path: "messages",
                    populate: {
                        path: "speaker",
                        select: "_id fullName userName avatar"
                    }
                }
            });
        // need interlocutor's name + avatar, conversation Id, last message + time
        const normalizedConversationsOverview = [];

        for (let i = 0; i < user.conversations.length; i++) {
            if (user.conversations[i].messages.length === 0) continue;

            const interlocutor = user.conversations[i].participants[0] == userId
                ? await User.findById(user.conversations[i].participants[1]).select("_id fullName userName avatar")
                : await User.findById(user.conversations[i].participants[0]).select("_id fullName userName avatar")

            const lastMessage = user.conversations[i].messages[user.conversations[i].messages.length - 1];

            normalizedConversationsOverview.push({
                _id: user.conversations[i]._id,
                interlocutor,
                lastMessage: {
                    _id: lastMessage._id,
                    speaker: {
                        _id: lastMessage.speaker._id,
                        fullName: lastMessage.speaker.fullName,
                        userName: lastMessage.speaker.userName,
                        avatar: lastMessage.speaker.avatar
                    },
                    content: lastMessage.content.length < 200 ? lastMessage.content : lastMessage.content.substring(0, 200) + "...",
                    dateOfTyping: lastMessage.dateOfTyping,
                    isUnRead: lastMessage.speaker._id != userId && !lastMessage.isReadBy.includes(userId)
                }
            });
        }

        

        return normalizedConversationsOverview;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const bulkNotifyFriends = async (genericNamespace = {}, dictionary = {}, userId = "", actionsArray) => {
    const allFriendsIds = JSON.stringify((await getFriends(userId)).map(({ user }) => user._id));

    const socketIdToUserIdEntries = Object.entries(dictionary);

    for (let i = 0; i < socketIdToUserIdEntries.length; i++) {
        const [sid, uid] = socketIdToUserIdEntries[i];

        if (allFriendsIds.includes(uid)) {
            for (let k = 0; k < actionsArray.length; k++) {
                genericNamespace.to(sid).emit('action', actionsArray[k]);
            }
        }
    }
};

const notifyUserById = (genericNamespace = {}, dictionary = {}, userId = "", actionObject) => {
    const onlineUsersIds = Object.values(dictionary);
    const socketIds = Object.keys(dictionary);

    if (JSON.stringify(onlineUsersIds).includes(userId.toString())) {
        //if user is using multiple tabs/windows
        for (let i = 0; i < onlineUsersIds.length; i++) {

            if (JSON.stringify(onlineUsersIds[i]) === JSON.stringify(userId)) {
                genericNamespace.to(socketIds[i]).emit('action', actionObject);
            }
        }
    }
};

const markMessagesAsRead = async (readerToken, conversationId, messageIds) => {
    console.log("mark as read?");
    try {
        const { id: readerId } = await util.promisify(jwt.verify)(readerToken, process.env.JWT_SECRET);
        const messages = await Message.find({ _id: {$in: messageIds}});
        const conversation = await Conversation.findById(conversationId);
        
        for (let i = 0; i < messages.length; i++) {
            messages[i].isReadBy = [...messages[i].isReadBy, readerId];
            await messages[i].save();
        }

        return {readerId, participantIds: conversation.participants};
    } catch (error) {
        console.log(error);
        return null;
    }
};

const justDetermineParticipants = async (senderToken, conversationId) => {
    try {
        const { id: userId } = await util.promisify(jwt.verify)(senderToken, process.env.JWT_SECRET);
        const user = await User.findById(userId).select("_id fullName userName avatar");

        const conversation = await Conversation.findById(conversationId);

        return {typingUser: user, participantIds: conversation.participants};
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    getUserProfile,
    getFriends,
    requestFriendship,
    cancelFriendship,
    acceptFriendRequest,
    rejectFriendRequest,
    withdrawFriendRequest,
    getUnreadEvents,
    getNotificationByType,
    markEventAsRead,
    startConversation,
    loadConversation,
    addMessageToConversation,
    getConversationsOverview,
    loadMoreMessages,
    bulkNotifyFriends,
    notifyUserById,
    markMessagesAsRead,
    justDetermineParticipants
};