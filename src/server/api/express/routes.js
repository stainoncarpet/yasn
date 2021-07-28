const router = require("express").Router();

const {getPosts}  = require("../../data/services/get-posts.js");
const {getComments}  = require("../../data/services/get-comments.js");

router.get("/post", async () => {});

router.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.status(200).send({posts: posts})
});

router.get("/comments", async (req, res) => {
    const comments = await getComments(req.query.postId);
    res.status(200).send({postId: req.query.postId, comments})
});

router.post("/user/signup", async () => {});

router.post("/user/login", async () => {});

router.post("/user/logout", async () => {});

router.post("/user/check", async () => {});

router.post("/user/validate", async () => {});

// switched to socket router.post("/post/create", async () => {});

/*switched to socket router.post("/post/vote", auth, async (req, res) => {
    const voteResult = await votePost(req.user, req.body.postId, req.body.result);
    res.status(200).send({msg: "OK"})
});*/

// switched to socket router.post("/comment/create", async () => {});

// switched to socket router.post("/comment/vote", async () => {});

router.get("/test", async (req, res) => {
    res.status(200).send({ msg: "You and the server shake hands" });
});

module.exports = router;