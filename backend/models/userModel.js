const mongoose = require("mongoose")
const Article = require("../models/articleModel")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    articles: [Article.schema]
})

module.exports = mongoose.model("User", userSchema);