const path = require('path');
const userModel = require(path.join(__dirname, "../models/users.model"));
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {

    const { fullName, email, role, password } = req.body;
    const user = new userModel({
        fullName, email, role, password: bcrypt.hashSync(password, 10)
    })

    user.save()
        .then(data => {
            res.send({ message: "User registered successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating user" })
        })
}


exports.login = (req, res) => {

    const { email, password } = req.body;

    userModel.findOne({ email: email })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Email Not Found" })
            }
            // compare passwords
            var isPasswordValid = bcrypt.compareSync(password, data.password);

            if (!isPasswordValid) {
                res.status(401).send({ message: "Invalid password" })
            }

            var token = jwt.sign({ id: data._id }, process.env.SECRET);

            res.send({
                user: {
                    id: data._id,
                    email: data.email,
                    fullName: data.fullName
                },
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while logging user" })
        })

    // create jwt and send in response

}



// bcrypt library