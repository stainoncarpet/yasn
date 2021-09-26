const router = require("express").Router();

const { getPosts } = require("../../../data/services/post-crud.js");
const { getComments } = require("../../../data/services/comment-crud.js");
const { getUserProfile } = require("../../../data/services/user-crud.js");

const io = require("../../socket/socket.js");

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

    console.log(req.cookies);

    if(profile) {
        res.status(200).send({msg: "OK", profile });
    } else {
        res.status(200).send({msg: "FAIL", profile, reason: "User doesn't exist" });
    }
    
});

module.exports = router;