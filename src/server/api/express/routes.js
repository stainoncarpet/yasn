const router = require("express").Router();
const fetch = require('node-fetch');

const { authenticateUser, createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, validateToken } = require("../../data/services/auth-crud.js");
const { getPosts } = require("../../data/services/get-posts.js");
const { getComments } = require("../../data/services/get-comments.js");
const { getUserProfile, getFriends, getUnreadEvents, getDataByType, markEventAsRead, startConversation, loadConversation, loadMoreMessages, getConversationsOverview } = require("../../data/services/user-crud.js");

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
    const profile = await getUserProfile(req.query.userName, req.query.requesterId);

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
    const data = await getDataByType(req.user, req.body.skip, req.body.limit, req.body.types);
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
    res.status(200).send({msg: "OK"});
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

router.get("/test", async (req, res) => {});

module.exports = router;