# YASN - Yet Another Social Network.

It was my attempt at building a social network mostly for educational purposes. It is a "work in progress" kind of thing, but it is unlikely to ever get finished since I've decided to build a better one from scratch with Next and some other stuff (which probably will never happen either).

## What's used (most notable)

### On the front:
1. React
2. Redux (toolkit)
3. SCSS
4. Bulma
4. Typescript

### On the back:
1. Express
2. MongoDB (Mongoose)
3. Javascript (couldn't get Typescript to work with GraphQL Server + undesired transpilation since it doesn't run natively on NodeJS)

Socket.io on both sides and Apollo/GraphQL initially (which was later replaced by Redux - weird, it's supposed to be the other way around).

The server uploads files (images) to some local disk (not cloud storage) therefore the whole app doesn't show images if deployed to Heroku and I don't want to bother trying to upload it anywhere else.

### What works:
1. Sign up
2. Log in/ Log out
3. Password reset (security codes sent via mailjet)
4. Send/accept/reject/withdraw friend request
5. Unfriend
6. Create/remove post/comment
7. Like/unlike/dislike/undislike post/comment (with instant ui updates via ws)
8. Chat (lazy-loading of previous messages)
9. Who saw whose message
10. Real-time notifications (e.g. "got a new message", "received a friend request")
11. Currently viewed friend is online/offline
12. Spinner/skeleton where applicable
