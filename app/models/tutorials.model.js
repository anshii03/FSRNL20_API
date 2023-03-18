
const mongoose = require("mongoose");
const TutorialsSchema = mongoose.Schema({
    title: String,
    // description: String,
    description: {
        type: String,
        minLength: 10
    },
    published: Boolean,
});

const TutorialModel = mongoose.model('tutorial', TutorialsSchema);

module.exports = TutorialModel;

