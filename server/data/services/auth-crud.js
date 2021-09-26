const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util");

const { decodeBase64ImageAndSaveToDisk, adjustForDateFormattingInconsistencies } = require("./utils.js");
const { User } = require("../mongo/entities/User/User-model.js");
const { PasswordResetAction } = require("../mongo/entities/Password-reset-action/Password-reset-action-model.js");
const { sendPasswordResetSecurityCode, sendSuccessfulRegistration, sendSuccessfulLogin } = require("../services/emailing.js");

const authenticateUser = async (req, res, next) => {
    try {
        const decoded = await util.promisify(jwt.verify)(req.cookies["X-AUTH-TOKEN"], process.env.JWT_SECRET);
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

        const fixedDOB = adjustForDateFormattingInconsistencies(dateOfBirth, 1);

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
            friends: [],
            conversations: []
        };

        const user = await User.create(carcass);

        const token = await generateToken({ id: user._id, email: user.email });
        const filename = await decodeBase64ImageAndSaveToDisk(avatarBase64String, user._id);

        user.authTokens = [token]
        user.avatar = filename;

        await user.save();

        const emailingResult = await sendSuccessfulRegistration(email, fullName);

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

            //const emailingResult = await sendSuccessfulLogin(user.email, user.fullName); disabled when development

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

const updateLastOnline = async (token = null, userId = null) => {
    console.log("UPDATING LAST ONLINE: ", token, userId);
    try {
        let user;

        if (token !== null) {
            const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
            user = await User.findById(decoded.id);
        } else {
            user = await User.findById(userId);
        }

        if (user) {
            user.lastOnline = new Date();

            await user.save();
        }

        return [user._id, user.lastOnline];
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

const startPasswordResetAction = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });

        if (user) {
            const code = Math.random().toString().substring(2, 8);
            const pra = await PasswordResetAction.create({ user: user, code: code, createdAt: new Date() });
            const emailResult = await sendPasswordResetSecurityCode(userEmail, user.fullName, code);

            setTimeout(() => {
                PasswordResetAction.findByIdAndDelete(pra._id)
                    .then(() => console.log("successfully cleaned up reset action"))
                    .catch(() => console.error("failed to clean up reset action"))
            }, parseInt(process.env.PASSWORD_RESET_ACTION_LIFESPAN) + 1000); // extra second to make up for delays

            return { resetActionId: pra._id };
        } else {
            return { reason: "No user with the specified email address exists" };
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const finishPasswordResetAction = async (userEmail, newPassword, securityCode, resetActionId) => {
    const pra = await PasswordResetAction.findById(resetActionId);

    if (pra && pra.code === securityCode) {
        const user = await User.findById(pra.user);
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.password = newPasswordHash;
        await user.save();
        PasswordResetAction.findByIdAndDelete(resetActionId)
            .then(() => console.log("successfully cleaned up reset action"))
            .catch(() => console.error("failed to clean up reset action"))

        return true;
    } else {
        return false;
    }
};

const getAccountSettingsData = async (userId) => {
    try {
        const user = await User.findById(userId);

        const fixedDOB = adjustForDateFormattingInconsistencies(user.dateOfBirth, -1);

        const fixedUser = { ...user._doc, dateOfBirth: fixedDOB };

        return fixedUser;
    } catch (error) {
        console.log(error);
    }
};

const updateAccountData = async (userId, newData) => {
    try {
        const user = await User.findById(userId);

        if (user) {
            user.fullName = newData.fullName || user.fullName;
            user.userName = newData.userName || user.fullName;
            user.location = newData.location || user.location;
            user.dateOfBirth = adjustForDateFormattingInconsistencies(newData.dateOfBirth, 1) || user.dateOfBirth;
            user.email = newData.email.toLowerCase() || user.email;

            await user.save();
        } 
        
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    authenticateUser,
    createUser,
    loginUser,
    logoutUser,
    checkUserNameAvailability,
    checkEmailAvailability,
    updateLastOnline,
    validateToken,
    generateToken,
    startPasswordResetAction,
    finishPasswordResetAction,
    getAccountSettingsData,
    updateAccountData
};