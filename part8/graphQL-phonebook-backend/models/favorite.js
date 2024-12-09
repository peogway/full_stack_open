const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    genre: {
        type: String,
    },
});

module.exports = mongoose.model("Favorite", schema);
