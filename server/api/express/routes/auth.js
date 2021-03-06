const router = require("express").Router();

const { signUpUser, loginUser, logoutUser, checkUserNameAvailability, checkEmailAvailability, validateToken, startPasswordResetAction, finishPasswordResetAction, authenticateUser, getAccountSettingsData, updateAccountData } = require("../../../data/services/auth-crud.js");

router.post("/auth/signup", async (req, res) => {
    try {
        const { fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String } = req.body;
        const [user, token] = await signUpUser(fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String);
        res.status(200).cookie("X-AUTH-TOKEN", token, { httpOnly: true }).send({ msg: "OK", user: user });
    } catch (error) {
        res.status(500).send({ msg: "FAIL", user: null, reason: "Somethingn went wrong" });
    }
});

router.post("/auth/login", async (req, res) => {
    try {
        const [user, token] = await loginUser(req.body.email, req.body.password);

        if (token) {
            res.status(200).cookie("X-AUTH-TOKEN", token, { httpOnly: true }).send({ msg: "OK", user: user });
        } else {
            res.status(401).send({ msg: "FAIL", user: null, reason: "Incorrect email or password" });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", user: null, reason: "Incorrect email or password" });
    }
});

router.get("/auth/logout", authenticateUser, async (req, res) => {
    // true if succseeful
    try {
        const isLogoutSuccess = await logoutUser(req.user, req.cookies["X-AUTH-TOKEN"]);

        if (isLogoutSuccess) {
            res.status(200).clearCookie("X-AUTH-TOKEN").send({ msg: "OK", reason: "You have logged out", result: isLogoutSuccess });
        } else {
            res.status(400).send({ msg: "FAIL", reason: "Something went wrong", result: isLogoutSuccess });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "Something went wrong", result: isLogoutSuccess });
    }
});

router.post("/auth/check", async (req, res) => {
    if (req.body.email) {
        const isAvailable = await checkEmailAvailability(req.body.email);
        res.status(200).send({ msg: "OK", reason: "This email is available", email: isAvailable })
    } else if (req.body.userName) {
        const isAvailable = await checkUserNameAvailability(req.body.userName);
        res.status(200).send({ msg: "OK", reason: "This username is available", userName: isAvailable })
    } else {
        res.status(400).send({ msg: "FAIL", reason: "Invalid query", email: null, userName: null });
    }
});

router.get("/auth/validate", authenticateUser, async (req, res) => {
    try {
        const validationResult = await validateToken(req.user, req.cookies["X-AUTH-TOKEN"]);

        if (validationResult) {
            res.status(200).send({ msg: "OK", validationResult: validationResult });
        } else {
            res.status(400).clearCookie("X-AUTH-TOKEN").send({ msg: "FAIL", validationResult: false });
        }
    } catch (error) {
        res.status(500).clearCookie("X-AUTH-TOKEN").send({ msg: "FAIL", reason: "Auth validation failed", validationResult: false });
    }
});

router.post("/auth/reset-password", async (req, res) => {
    try {
        const { resetActionId, reason } = await startPasswordResetAction(req.body.email);

        if (resetActionId) {
            res.status(200).send({ msg: "OK", reason: "A security code has been sent to your email address", resetActionId });
        } else if (reason) {
            res.status(400).send({ msg: "FAIL", reason });
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
            res.status(200).send({ msg: "OK", reason: "Now you can log in with your new password" });
        } else {
            res.status(400).send({ msg: "FAIL", reason: "Invalid code" });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "Password reset fail" });
    }
});

router.get("/auth/account-settings", authenticateUser, async (req, res) => {
    try {
        const user = await getAccountSettingsData(req.user);

        if (user) {
            res.status(200).send({ msg: "OK", reason: "User data fetched", user });
        } else {
            res.status(400).send({ msg: "FAIL", reason: "User data not available", user: null });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "User data not available", user: null });
    }
});

router.put("/auth/update-account", authenticateUser, async (req, res) => {
    try {
        const user = await updateAccountData(req.user, req.body.data);

        if (user) {
            res.status(200).send({ msg: "OK", reason: "User data updated", user });
        } else {
            res.status(400).send({ msg: "FAIL", reason: "User data update failed", user: null });
        }
    } catch (error) {
        res.status(500).send({ msg: "FAIL", reason: "User data update failed", user: null });
    }
});

module.exports = router;