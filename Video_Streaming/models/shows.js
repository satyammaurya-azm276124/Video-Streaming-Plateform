const mongoose = require('mongoose');

const showsSchema = new mongoose.Schema({
    title: String,
    title_img: String,
    synopsis: String,
    banner: String,
    ratings: String,
    path: String,
})

const Shows = mongoose.model("shows", showsSchema);

module.exports = {
    Shows
}
