const router = require("express").Router();

const auth  = require("../../data/services/auth.js");
const {getPosts}  = require("../../data/services/get-posts.js");
const {getComments}  = require("../../data/services/get-comments.js");
const {getFriends}  = require("../../data/services/friends-crud.js");
const {loginUser, createUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, getUserProfile} = require("../../data/services/user-crud.js");

router.get("/post", async () => {});

router.get("/posts", async (req, res) => {
    const posts = await getPosts(req.query.user); // userName
    res.status(200).send({posts: posts})
});

router.get("/comments", async (req, res) => {
    const comments = await getComments(req.query.postId);
    res.status(200).send({postId: req.query.postId, comments})
});

/* USER */
// get user info, friends, posts
router.get("/user/profile", async (req, res) => {
    // req.quey.userName
    const profile = await getUserProfile(req.query.userName)
    res.status(200).send(profile)
});

router.post("/user/signup", async (req, res) => {
    const {fullName, userName, email, password, avatarBase64String} = req.body;
    const user = await createUser(fullName, userName, email, password, avatarBase64String);
    res.status(200).send({msg: "OK", user: user})
});

router.post("/user/login", async (req, res) => {
    const user = await loginUser(req.body.email, req.body.password);
    res.status(200).send({msg: "OK", user: user})
});

router.post("/user/logout", async (req, res) => {
    const result = await logoutUser(req.body.id, req.body.token);
    res.status(200).send({msg: "OK", result: result})
});

router.post("/user/check", async (req, res) => {
    if(req.body.email) {
        const isAvailable = await checkEmailAvailability(req.body.email);
        res.status(200).send({msg: "OK", email: isAvailable})
    } else if (req.body.userName) {
        const isAvailable = await checkUserNameAvailability(req.body.userName);
        res.status(200).send({msg: "OK", userName: isAvailable})
    } else {
        res.status(200).send({msg: "FAIL", reason: "Invalid query", email: null, userName: null})
    }
});

router.get("/friends", async (req, res) => {
    console.log("get friends route called");

    const friends = await getFriends(req.query.userName);

    if(friends){
        res.status(200).send({msg: "OK", friends: friends});
    } else {
        res.status(200).send({msg: "OK", friends: null});
    }
});

router.post("/user/validate", async () => {});

router.get("/test", async (req, res) => {
    res.status(200).send({ msg: "You and the server shake hands" });
});

module.exports = router;