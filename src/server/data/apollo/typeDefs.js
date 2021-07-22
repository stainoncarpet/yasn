// Adjust schemas in here, services/create-user.js, mutations/create-user.js, User-schema.js
const typeDefs = `
    type Query {
        post(id: ID): Post!
        posts: [Post!]!
    }

    type Mutation {
        createUser(fullName: String!, userName: String!, email: String!, password: String!, avatarBase64String: String!): User!
        loginUser(email: String, password: String): AuthEvent!
        logoutUser(id: ID, authToken: String): Boolean!
        checkUserNameAvailability(userName: String): Boolean!
        validateAuthCredentials(id: ID, authToken: String): AuthEvent
        createPost(authToken: String!, postTitle: String!, postContent: String!): Post!
        createComment(authToken: String!, content: String!, postId: ID!, replyTo: ID): Comment
        votePost(authToken: String!, postId: ID!, voteResult: Int): Post
        voteComment(authToken: String!, commentId: ID!, voteResult: Int): Comment
    }

    type Subscription {
        commentAdded(commentId: String!): Comment!
        voteCounted: Comment!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        dateOfPublication: String!
        comments: [Comment]
        likers: [User]
        dislikers: [User]
        reposters: [User]
    }

    type User {
        id: ID!
        fullName: String!
        userName: String!
        email: String!
        password: String!
        dateOfBirth: String
        dateOfRegistration: String
        avatar: String,
        authTokens: [String]
        friends: [User]
    }

    type AuthEvent {
        userId: ID
        authToken: String
        avatar: String
    }

    type Comment {
        id: ID!
        dateOfPublication: String!
        content: String!
        author: User!
        post: ID!
        replyTo: ID
        likers: [ID]
        dislikers: [ID]
    }

    union Entity = Post | User
`

module.exports = {typeDefs};