const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util");

const { decodeBase64ImageAndSaveToDisk } = require("./decode-base64.js");
const { User } = require("../mongo/entities/User/User-model.js");

const authenticateUser = async (req, res, next) => {
    try {
        const decoded = await util.promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.log("bad token provided ", error);
        res.status(401).send({ msg: "FAIL", reason: "bad token" })
    }
};

const createUser = async (fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const DOB = new Date(dateOfBirth);
        const fixedDOB = new Date(dateOfBirth);
        fixedDOB.setDate(DOB.getDate() + 1);

        const carcass = {
            fullName: fullName,
            userName: userName,
            location: {
                country,
                state,
                city
            },
            email: email,
            password: hashedPassword,
            dateOfBirth: fixedDOB,
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
            token: token,
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
    try {
        const user = await User.findOne({ userName: { '$regex': new RegExp(['^', userName, '$'].join(""), 'i') } });

        if (user) {
            return false; // false - name is already taken and not available
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const checkEmailAvailability = async (email) => {
    try {
        const user = await User.findOne({ email: { '$regex': new RegExp(['^', email, '$'].join(""), 'i') } })

        if (user) {
            return false; // false - email is already taken and not available
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
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

// payload: { id: user._id, email: user.email })
const generateToken = async (payload) => {
    try {
        const token = await util.promisify(jwt.sign)(payload, process.env.JWT_SECRET);
    
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const validateToken = async (userId, token) => {
    try {
        const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id); 

        return true;
    } catch (error) {
        const user = await User.findById(userId);
        user.authTokens = user.authTokens.filter((t) => t !== token);
        await user.save();

        console.log(error);
        return false;
    }
    
};

module.exports = { 
    authenticateUser, createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, updateLastOnline, 
    validateToken, generateToken
};