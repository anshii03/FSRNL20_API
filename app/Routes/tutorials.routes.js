const path = require('path');
const tutorialControllers = require(path.join(__dirname, "../controllers/tutorial.controller"));
var jwtAuth = require(path.join("../middlewares/authJWT"));

module.exports = app => {
    app.post("/api/tutorials", jwtAuth, tutorialControllers.create);
    app.get("/api/tutorials", tutorialControllers.findAll);
    app.get("/api/tutorials/:id", tutorialControllers.findOne);
    app.put("/api/tutorials/:id", tutorialControllers.update);
    app.delete("/app/tutorials/:id", tutorialControllers.deletedOne);
    app.delete("/api/tutorials", tutorialControllers.deletedAll);

    // create rest of the apis here
}

// only admins should be able to post and delete
