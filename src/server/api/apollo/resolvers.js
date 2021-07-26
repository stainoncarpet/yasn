const {createUser} = require("../../data/services/create-user.js");
const {loginUser} = require("../../data/services/login-user.js");
const { logoutUser } = require("../../data/services/logout-user.js");
const {checkUserNameAvailability} = require("../../data/services/check-username-availability");
const {validateAuthCredentials} = require("../../data/services/validate-auth-credentials.js");
const {createPost} = require("../../data/services/create-post.js");
const {getPosts} = require("../../data/services/get-posts.js");
const {createComment} = require("../../data/services/create-comment.js");
const {getCommentAuthor} = require("../../data/services/get-comment-author.js");
const {voteComment, votePost} = require("../../data/services/vote.js");
const {getPost} = require("../../data/services/get-post.js");

const pubsub = require("../../pubsub.js")

const resolvers = {
  Query: {
      post: getPost,
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
  Subscription: {
    commentAdded: {
      subscribe: (parent, args, context, info) => {
        console.log("comment added subscription activated", args);

        return pubsub.asyncIterator('commentAdded');
      },
      resolve: (payload) => payload,
    },
    onCommentVoteCounted: {
      subscribe: (parent, args, context, info) => {
        console.log("vote counted subscription activated", args);

        return pubsub.asyncIterator('onCommentVoteCounted');
      },
      resolve: (payload) => payload
    },
    onPostVoteCounted: {
      subscribe: (parent, args, context, info) => {
        console.log("post vote counted subscription activated", args);

        return pubsub.asyncIterator('onPostVoteCounted');
      },
      resolve: (payload) => payload
    }
  },
  Comment: {
    author: getCommentAuthor
  }
};

module.exports = {resolvers};