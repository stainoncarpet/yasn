const router = require("express").Router();

const { createUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, validateToken, startPasswordResetAction, finishPasswordResetAction, authenticateUser, getAccountSettingsData, updateAccountData } = require("../../../data/services/auth-crud.js");

router.post("/auth/signup", async (req, res) => {
    const { fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String } = req.body;
    const user = await createUser(fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String);
    res.status(200).send({ msg: "OK", user: user });
});

router.post("/auth/login", async (req, res) => {
    const user = await loginUser(req.body.email, req.body.password);

    if (user.token) {
        res.status(200).send({ msg: "OK", user: user });
    } else {
        res.status(401).send({ msg: "FAIL", user: null, reason: "Incorrect email or password" });
    }
});

router.post("/auth/logout", async (req, res) => {
    const result = await logoutUser(req.body.id, req.body.token);
    res.status(200).send({ msg: "OK", reason: "You have logged out", result: result });
});

router.post("/auth/check", async (req, res) => {
    if (req.body.email) {
        const isAvailable = await checkEmailAvailability(req.body.email);
        res.status(200).send({ msg: "OK", email: isAvailable })
    } else if (req.body.userName) {
        console.log("checking", req.body.userName);
        const isAvailable = await checkUserNameAvailability(req.body.userName);
        res.status(200).send({ msg: "OK", userName: isAvailable })
    } else {
        res.status(200).send({ msg: "FAIL", reason: "Invalid query", email: null, userName: null });
    }
});

router.post("/auth/validate", async (req, res) => {
    const validationResult = await validateToken(req.body.userId, req.body.token);

    res.status(200).send({ msg: "OK", validationResult: validationResult });
});

router.post("/auth/reset-password", async (req, res) => {
    try {
        const { resetActionId, reason } = await startPasswordResetAction(req.body.email);

        if (resetActionId) {
            res.status(200).send({ msg: "OK", reason: "A security code has been sent to your email address", resetActionId });
        } else if (reason) {
            res.status(400).send({ msg: "FAIL", reason});
        } else {
            res.status(400).send({ msg: "FAIL", reason: "Something went wrong with resetting your password" });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "Something went wrong with resetting your password" });
    }
});

router.post("/auth/set-password", async (req, res) => {
    try {
        const isSuccess = await finishPasswordResetAction(req.body.email, req.body.password, req.body.code, req.body.resetActionId);

        if (isSuccess) {
            res.status(200).send({ msg: "OK", reason: "Now you can log in with your new password"});
        } else {
            res.status(400).send({ msg: "FAIL", reason: "Invalid code"});
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "Password reset fail"});
    }
});

router.post("/auth/account-settings", authenticateUser, async (req, res) => {
    try {
        const user = await getAccountSettingsData(req.user);

        if(user) {
            res.status(200).send({ msg: "OK", reason: "User data fetched", user});
        } else {
            res.status(400).send({ msg: "FAIL", reason: "User data not available", user: null});
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "User data not available", user: null});
    }
});

router.put("/auth/update-account", authenticateUser, async (req, res) => {
    try {
        const user = await updateAccountData(req.user, req.body.data);

        if(user) {
            res.status(200).send({ msg: "OK", reason: "User data updated", user});
        } else {
            res.status(400).send({ msg: "FAIL", reason: "User data update failed", user: null});
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "User data update failed", user: null});
    }
});

module.exports = router;