const bcrypt = require("bcrypt");

const { User } = require("../mongo/entities/User/User-model.js");
const { generateToken } = require("./generate-token.js");
const {decodeBase64ImageAndSaveToDisk} = require("./decode-base64.js");

const createUser = async (parent, args, context, info) => {
  const { avatarBase64String } = args;
  try {
    const hashedPassword = await bcrypt.hash(args.password, 10);

    // Adjust schemas in here, typeDefs.js, mutations/create-user.js, User-schema.js
    const carcass = {
      fullName: args.fullName,
      userName: args.userName,
      email: args.email,
      password: hashedPassword,
      dateOfBirth: new Date(),
      avatar: null,
      authTokens: [],
      dateOfRegistration: new Date(),
      friends: []
    };

    const user = await User.create(carcass);

    const token = await generateToken({ id: user._id, email: user.email });
    const filename = await decodeBase64ImageAndSaveToDisk(avatarBase64String, user._id);

    user.authTokens = [token]
    user.avatar = filename;

    await user.save();

    return { id: user._id, authTokens: user.authTokens, avatar: user.avatar };
  } catch (error) {
    console.error(error);

    return null;
  }
};

module.exports = { createUser };