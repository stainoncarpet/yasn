const router = require("express").Router();

const {getPosts}  = require("./data/services/get-posts.js");
const {getComments}  = require("./data/services/get-comments.js");

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

router.post("/post/create", async () => {});

router.post("/post/vote", async () => {});

router.post("/comment/create", async () => {});

router.post("/comment/vote", async () => {});

module.exports = router;