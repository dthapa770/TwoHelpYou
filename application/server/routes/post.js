const {request} = require('express');
var express = require('express');
var router = express.Router();
const PostModel = require('../models/Post');

// Last else statment needs to be adjusted to populate 
// most highest rated posts using the course_prefix
// when no results were found.
router.get('/search', async (req, res, next) => {
    let searchQuery = (req.query.search).split(',');
    let prefix = searchQuery[0];
    let searchTerm = searchQuery[0] + searchQuery[1];
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
            let results = await PostModel.getNHighestPrefixPosts(5, prefix);
            res.send({
                message: " most highest rated posts within catagory, no results were found.",
                results: results
            });
        }
    }
})

module.exports= router;