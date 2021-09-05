const router = require("express").Router();
const fetch = require('node-fetch');

const { authenticateUser, createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, validateToken } = require("../../data/services/auth-crud.js");
const { getPosts } = require("../../data/services/get-posts.js");
const { getComments } = require("../../data/services/get-comments.js");
const { getUserProfile, getFriends, getUnreadEvents, getNotificationByType, markEventAsRead, startConversation, loadConversation, loadMoreMessages, getConversationsOverview, requestFriendship, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest, notifyUserById } = require("../../data/services/user-crud.js");

const io = require("../socket/socket.js");

router.get("/post", async () => { });

/* PROFILE */
router.get("/profile/posts", async (req, res) => {
    const posts = await getPosts(req.query.user); // userName
    res.status(200).send({ posts: posts })
});

router.get("/profile/comments", async (req, res) => {
    const comments = await getComments(req.query.postId);
    res.status(200).send({ postId: req.query.postId, comments })
});

router.get("/profile/user", async (req, res) => {
    const dictionary = io.getUserDictionary();
    const profile = await getUserProfile(req.query.userName, req.query.requesterId, dictionary);

    if(profile) {
        res.status(200).send({msg: "OK", profile });
    } else {
        res.status(200).send({msg: "FAIL", profile, reason: "User doesn't exist" });
    }
    
});
/* PROFILE */

/* USER */
router.post("/user/friends", authenticateUser, async (req, res) => {
    console.log("user friends route called");
    const friends = await getFriends(req.user);

    if (friends) {
        res.status(200).send({ msg: "OK", friends: friends });
    } else {
        res.status(200).send({ msg: "OK", friends: null });
    }
});

// req.user = id after auth
router.post("/user/events", authenticateUser, async (req, res) => {
    const events = await getUnreadEvents(req.user, req.body.skip, req.body.limit);

    if (events) {
        res.status(200).send({ msg: "OK", events: events });
    } else {
        res.status(200).send({ msg: "OK", events: null });
    }
});

router.post("/user/events/read", authenticateUser, async (req, res) => {
    const event = await markEventAsRead(req.user, req.body.eventId);

    if (event.isMarked) {
        res.status(200).send({ msg: "OK", event: event });
    } else {
        res.status(200).send({ msg: "FAIL", event: event });
    }
});

// token, skip, limit, types = []
router.post("/user/lists", authenticateUser, async (req, res) => {
    const data = await getNotificationByType(req.user, req.body.skip, req.body.limit, req.body.types);
    res.status(200).send({ msg: "OK", data: data });
});

// fetch image from URL and attach cors
router.post("/user/relay", async (req, res) => {
    if(req.body.url){
        const result = await fetch(req.body.url);
        const blob = await result.blob();
        const buffer = await blob.arrayBuffer();
    
        res.status(200).type(blob.type).send(Buffer.from(buffer));
    } else {
        res.status(200).send({msg: "FAIL"});
    }
});

// or resume if already exists
router.post("/user/conversation/start", authenticateUser, async (req, res) => {
    const conversation = await startConversation(req.user, req.body.userName);
    
    if(conversation) {
        res.status(200).send({msg: "OK", conversation});
    } else {
        res.status(200).send({msg: "OK", conversation, reason: "Can't find specified conversation"});
    }
});

router.post("/user/conversation/load", authenticateUser, async (req, res) => {
    const conversation = await loadConversation(req.user, req.body.conversationId, req.body.sliceQuantity);

    if(conversation) {
        res.status(200).send({msg: "OK", conversation});
    } else {
        res.status(200).send({msg: "OK", conversation, reason: "Can't find specified conversation"});
    }
});

router.post("/user/conversations/overview", authenticateUser, async (req, res) => {
    const conversations = await getConversationsOverview(req.user);

    if(conversations) {
        res.status(200).send({msg: "OK", conversations});
    } else {
        res.status(200).send({msg: "OK", conversations, reason: "Can't find conversations"});
    }
});

router.post("/user/messages/load", authenticateUser, async (req, res) => {
    const moreMessages = await loadMoreMessages(req.user, req.body.conversationId, req.body.alreadyLoadedNumber);
    
    if(moreMessages) {
        res.status(200).send({msg: "OK", moreMessages});
    } else {
        res.status(500).send({msg: "FAIL", moreMessages, reason: "couldn't fetch messages"});
    }
});

router.post("/user/friends/request", authenticateUser, async (req, res) => {
    const { targetUserId, notification, requester } = await requestFriendship(req.body.userName, req.user);

    if(targetUserId) {
        res.status(200).send({msg: "OK", targetUserId, notification, requester});

        const rootNamespace = io.getRootNamespace();
        const userDictionary = io.getUserDictionary();
        const action = { type: 'user/client/receive/frequest', payload: { notification, requester } };
        
        notifyUserById(rootNamespace, userDictionary, targetUserId, action);
    } else {
        res.status(500).send({msg: "FAIL", targetUserId: null, notification: null, requester: null, reason: ""});
    }
});

router.post("/user/friends/cancel", authenticateUser, async (req, res) => {
    const {fshipId, notification, targetUserId} = await cancelFriendship(req.body.fshipId, req.user, "unfriended you");

    if(fshipId) {
        res.status(200).send({msg: "OK", fshipId, notification});
        
        const rootNamespace = io.getRootNamespace();
        const userDictionary = io.getUserDictionary();
        const action = { type: 'user/client/cancel/friendship', payload: { notification } };
        
        notifyUserById(rootNamespace, userDictionary, targetUserId, action);
    } else {
        res.status(500).send({msg: "FAIL", fshipId: null, notification:null, reason: "Something went wrong with unfriending"});
    }
});

router.post("/user/friends/accept", authenticateUser, async (req, res) => {
    const {eventNotification, friendshipInitiatorId, newFriend} = await acceptFriendRequest(req.body.fshipId, req.user);

    if(friendshipInitiatorId) {
        res.status(200).send({msg: "OK", fshipId: newFriend.fshipId});

        const rootNamespace = io.getRootNamespace();
        const userDictionary = io.getUserDictionary();
        const action = { type: 'user/client/accept/frequest', payload: { notification: eventNotification, newFriend } };

        notifyUserById(rootNamespace, userDictionary, friendshipInitiatorId, action);
    } else {
        res.status(500).send({msg: "FAIL", fshipId: null, reason: "Something went wrong with accepting said friend request"});
    }
});

router.post("/user/friends/reject", authenticateUser, async (req, res) => {
    const {fshipId, notification, targetUserId} = await rejectFriendRequest(req.body.fshipId, req.user);

    if(fshipId) {
        res.status(200).send({msg: "OK", fshipId, notification});
        
        const rootNamespace = io.getRootNamespace();
        const userDictionary = io.getUserDictionary();
        const action = { type: 'user/client/cancel/friendship', payload: { notification } };
        
        notifyUserById(rootNamespace, userDictionary, targetUserId, action);
    } else {
        res.status(500).send({msg: "FAIL", fshipId: null, notification:null, reason: "Something went wrong with unfriending"});
    }
});

router.post("/user/friends/withdraw", authenticateUser, async (req, res) => {
    const {fshipId, removableNotificationId, targetUserId} = await withdrawFriendRequest(req.body.fshipId, req.user);

    if(fshipId){
        res.status(200).send({msg: "OK", fshipId, removableNotificationId});

        const rootNamespace = io.getRootNamespace();
        const userDictionary = io.getUserDictionary();
        const action = { type: 'user/client/withdraw/frequest', payload: { removableNotificationId } };
        
        notifyUserById(rootNamespace, userDictionary, targetUserId, action);
    } else {
        res.status(500).send({msg: "OK", fshipId: null, removableNotificationId: null, reason: "Failed to withdraw friend request"});
    }
});
/* USER */

/* AUTH */
router.post("/auth/signup", async (req, res) => {
    const { fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String } = req.body;
    const user = await createUser(fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String);
    res.status(200).send({ msg: "OK", user: user });
});

router.post("/auth/login", async (req, res) => {
    const user = await loginUser(req.body.email, req.body.password);
    
    if(user.token) {
        res.status(200).send({ msg: "OK", user: user });
    } else {
        res.status(401).send({ msg: "FAIL", user: null, reason: "Incorrect email or password" });
    }
});

router.post("/auth/logout", async (req, res) => {
    const result = await logoutUser(req.body.id, req.body.token);
    res.status(200).send({ msg: "OK", result: result });
});

router.post("/auth/check", async (req, res) => {
    if (req.body.email) {
        const isAvailable = await checkEmailAvailability(req.body.email);
        res.status(200).send({ msg: "OK", email: isAvailable })
    } else if (req.body.userName) {
        const isAvailable = await checkUserNameAvailability(req.body.userName);
        res.status(200).send({ msg: "OK", userName: isAvailable })
    } else {
        res.status(200).send({ msg: "FAIL", reason: "Invalid query", email: null, userName: null });
    }
});

router.post("/auth/validate", async (req, res) => {
    const validationResult = await validateToken(req.body.userId, req.body.token);

    res.status(200).send({ msg: "OK", validationResult: validationResult });
});
/* AUTH */


const {User} = require("../../data/mongo/entities/User/User-model");
router.get("/test", async (req, res) => {
    const user = await User.findById("60f5b3de52a4b813525c65c5").populate("notifications");
    res.status(200).send({ msg: "OK", user });
});

module.exports = router;