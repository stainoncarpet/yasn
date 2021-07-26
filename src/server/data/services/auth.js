const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    console.log(req.body);
    try {
        jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
            req.user = decoded.id;
            next();
        });
    } catch (error) {
        console.log("bad token provided ", error);
        res.status(301).send({msg: "FAIL", reason: "bad token"})
    }  
};

module.exports = auth;