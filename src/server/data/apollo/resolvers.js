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

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
  Subscription: {
    commentAdded: {
      subscribe: (parent, args, context, info) => {
        console.log("comment added subscription activated");

        return pubsub.asyncIterator('commentAdded');
      },
      resolve: (payload) => {
        console.log("resolve triggered");

        return payload;
      }
    },
  },
  Comment: {
    author: getCommentAuthor
  }
};

module.exports = {resolvers};