const {createUser} = require("../services/create-user.js");
const {loginUser} = require("../services/login-user.js");
const { logoutUser } = require("../services/logout-user.js");
const {checkUserNameAvailability} = require("../services/check-username-availability");
const {validateAuthCredentials} = require("../services/validate-auth-credentials.js");
const {createPost} = require("../services/create-post.js");
const {getPosts} = require("../services/get-posts.js");
const {createComment} = require("../services/create-comment.js");
const {getCommentAuthor} = require("../services/get-comment-author.js");
const {voteComment, votePost} = require("../services/vote.js");

const resolvers = {
  Query: {
      post: () => [{id: "id", title: "title", body: "body"}],
      posts: getPosts
  },
  Mutation: {
    createUser: createUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    checkUserNameAvailability: checkUserNameAvailability,
    validateAuthCredentials: validateAuthCredentials,
    createPost: createPost,
    createComment: createComment,
    votePost: votePost,
    voteComment: voteComment
  },
  Comment: {
    author: getCommentAuthor
  }
};

module.exports = {resolvers};