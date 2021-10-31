const {request} = require('express');
var express = require('express');
var router = express.Router();
const PostModel = require('../models/Post');

router.get('/search', async (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        res.send({
            message: "No search term given",
            results: []
        });
    } else {
        let results = await PostModel.search(searchTerm);
        if (results.length) {
            res.send({
                message: " relevent post(s) found.",
                results: results
            });
        } else {
            let results = await PostModel.getNHighestPosts(5);
            res.send({
                // temporally say recent should be highest rated
                message: " most recent posts, no results were found.",
                results: results
            });
        }
    }
})

module.exports= router;