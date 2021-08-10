const router = require("express").Router();

const {authenticateUser, createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, validateToken } = require("../../data/services/auth-crud.js");
const {getPosts}  = require("../../data/services/get-posts.js");
const {getComments}  = require("../../data/services/get-comments.js");
const {getUserProfile, getFriends} = require("../../data/services/user-crud.js");

router.get("/post", async () => {});

/* PROFILE */
router.get("/profile/posts", async (req, res) => {
    const posts = await getPosts(req.query.user); // userName
    res.status(200).send({posts: posts})
});

router.get("/profile/comments", async (req, res) => {
    const comments = await getComments(req.query.postId);
    res.status(200).send({postId: req.query.postId, comments})
});

router.get("/profile/user", async (req, res) => {
    const profile = await getUserProfile(req.query.userName, req.query.requesterId)
    res.status(200).send({profile})
});
/* PROFILE */

/* USER */
router.get("/user/friends", async (req, res) => {
    console.log("get friends route called");

    const friends = await getFriends(req.query.userName);

    if(friends){
        res.status(200).send({msg: "OK", friends: friends});
    } else {
        res.status(200).send({msg: "OK", friends: null});
    }
});
/* USER */

/* AUTH */
router.post("/auth/signup", async (req, res) => {
    const {fullName, userName, email, password, avatarBase64String} = req.body;
    const user = await createUser(fullName, userName, email, password, avatarBase64String);
    res.status(200).send({msg: "OK", user: user});
});

router.post("/auth/login", async (req, res) => {
    const user = await loginUser(req.body.email, req.body.password);
    res.status(200).send({msg: "OK", user: user});
});

router.post("/auth/logout", async (req, res) => {
    console.log("LOGOUT REQUESTED ", req);
    const result = await logoutUser(req.body.id, req.body.token);
    res.status(200).send({msg: "OK", result: result});
});

router.post("/auth/check", async (req, res) => {
    if(req.body.email) {
        const isAvailable = await checkEmailAvailability(req.body.email);
        res.status(200).send({msg: "OK", email: isAvailable})
    } else if (req.body.userName) {
        const isAvailable = await checkUserNameAvailability(req.body.userName);
        res.status(200).send({msg: "OK", userName: isAvailable})
    } else {
        res.status(200).send({msg: "FAIL", reason: "Invalid query", email: null, userName: null});
    }
});

router.post("/auth/validate", async (req, res) => {
    const validationResult = await validateToken(req.body.userId, req.body.token);

    res.status(200).send({msg: "OK", validationResult: validationResult});
});
/* AUTH */

router.get("/test", async (req, res) => {
    res.status(200).send({ msg: "You and the server shake hands" });
});

module.exports = router;