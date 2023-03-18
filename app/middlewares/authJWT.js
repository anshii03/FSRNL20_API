const path = require('path');
const jwt = require("jsonwebtoken");
const userModel = require(path.join(__dirname, "../models/users.model"));

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {

        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, function (err, decode) {

            if (err) {
                res.status(403).send({ message: "Invalid JWT Token" })
            }

            userModel.findById(decode.id)
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                })
        })
    }
    else {
        res.status(403).send({ message: "Invalid JWT Token" });
        next();
    }
}

module.exports = verifyToken;
