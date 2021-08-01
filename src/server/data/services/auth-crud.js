const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util")

const { generateToken } = require("./generate-token.js");
const { decodeBase64ImageAndSaveToDisk } = require("./decode-base64.js");
const { User } = require("../mongo/entities/User/User-model.js");

const authenticateUser = async (req, res, next) => {
    try {
        const decoded = await util.promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.log("bad token provided ", error);
        res.status(301).send({ msg: "FAIL", reason: "bad token" })
    }
};

const createUser = async (fullName, userName, email, password, avatarBase64String) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const carcass = {
            fullName: fullName,
            userName: userName,
            email: email,
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

        return {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            dateOfRegistration: user.dateOfRegistration,
            token: user.authTokens,
            avatar: user.avatar
        }
    } catch (error) {
        console.error(error);

        return null;
    }
};

const loginUser = async (email, password) => {

    try {
        const user = await User.findOne({ email: email });
        let isPasswordCorrect;

        if (user) {
            isPasswordCorrect = await bcrypt.compare(password, user.password);
        } else {
            return { userId: null, authToken: null };
        }

        if (isPasswordCorrect) {
            const token = await generateToken({ id: user._id, email: user.email });
            user.authTokens = [...user.authTokens, token];

            await user.save();

            return {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                dateOfRegistration: user.dateOfRegistration,
                token: token,
                avatar: user.avatar
            }
        } else {
            return { userId: null, userName: null, authToken: null, avatar: null };
        }
    } catch (error) {
        console.error(error);

        return { userId: null, authToken: null, avatar };
    }
};

const logoutUser = async (id, authToken) => {

    try {
        const user = await User.findById(id);

        if (user) {
            user.authTokens = user.authTokens.filter((token) => token !== authToken);
            await user.save();

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);

        return false
    }
};

const checkUserNameAvailability = async (userName) => {
    const user = await User.findOne({ userName: { '$regex': new RegExp(['^', userName, '$'].join(""), 'i') } });

    if (user) {
        return false; // false - name is already taken and not available
    } else {
        return true;
    }
};

const checkEmailAvailability = async (email) => {
    const user = await User.findOne({ email: { '$regex': new RegExp(['^', email, '$'].join(""), 'i') } })

    if (user) {
        return false; // false - name is already taken and not available
    } else {
        return true;
    }
};

const updateLastOnline = async (token) => {
    try {
        const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)

        user.lastOnline = new Date();

        await user.save();

        console.log(user.lastOnline);

        return user.lastOnline;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { authenticateUser, createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, updateLastOnline };