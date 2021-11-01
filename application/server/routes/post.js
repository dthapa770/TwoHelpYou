const {request} = require('express');
var express = require('express');
var router = express.Router();
const PostModel = require('../models/Post');

// Last else statment needs to be adjusted to populate 
// most highest rated posts using the course_prefix
// when no results were found.
router.get('/search', async (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        // Message doesn't appear.
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
                message: " most highest rated posts, no results were found.",
                results: results
            });
        }
    }
})

module.exports= router;