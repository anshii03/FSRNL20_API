const path = require('path');
const userControllers = require(path.join(__dirname, "../controllers/users.controller"));

module.exports = app => {
    app.post("/api/register", userControllers.register);
    app.post("/api/login", userControllers.login);

    // create rest of the apis here
}