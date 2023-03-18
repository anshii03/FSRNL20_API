const path = require('path');
const TutorialModel = require(path.join(__dirname, "../models/tutorials.model"));


// exports.create = (req, res) => {
//     res.json({ message: "Hi creating controller" });
// }


exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).json({ message: "Title cannot be empty" });
    }
    const { title, description, published } = req.body;

    const tutorial = new TutorialModel({ title, description, published: published ? published : false });

    tutorial.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating tutorial" })
        })
}

exports.findAll = (req, res) => {
    TutorialModel.find()
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

exports.findOne = (req, res) => {
    var _id = req.params.id;
    console.log("id", _id);
    TutorialModel.find({ _id })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

exports.update = (req, res) => {

    const userRole = req.user.role;

    if (userRole !== 'admin') {
        res.status(403).send({ message: "Only admin users are allowed to perform this task" })
    }

    const _id = req.params.id;

    if (!req.body) {
        res.status(400).send({ message: "Data cannot be empty" });
    }

    TutorialModel.findByIdAndUpdate(_id, req.body, {})
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })

}

exports.deletedAll = (req, res) => {

    TutorialModel.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} tutorials deleted successfully` });
        })

}

exports.deletedOne = (req, res) => {
    var _id = req.params.id;

    console.log(_id);
    TutorialModel.findByIdAndRemove(_id, {})
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "something went wrong" })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

