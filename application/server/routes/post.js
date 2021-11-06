/******************************************************************************
 * Class: CSC 0648-03 Software Engineering Fall 2021
 * Team: 1
 * Name:  Justin Lam
 *        Aviral Puri
 *        Dinesh Thapa
 *        Kurt D Resayo
 *        Wesley J Xu
 *        Chung Hei Fong
 * 
 * File: post.js
 * 
 * Description: Currently deals with anything post related
 *****************************************************************************/

//const {request} = require('express');
var express = require('express');
var router = express.Router();
const PostModel = require('../models/post_model');

/**
 * Builds the string that is needed to forward to post middlware
 * based on the intial response and queries content will
 * results in different responses that generally returns
 * the information needed to build the tutoring post/cards
 */
router.get('/search', async (req, res, next) => {
    let searchQuery = (req.query.search).split(',');
    let searchTerm = '';
    let prefix = searchQuery[0];
    if (prefix != '')
        searchTerm = searchQuery[0] +' '+ searchQuery[1];
    else
        searchTerm = searchQuery[1];
    if (!searchTerm) {
        let results = await PostModel.GetNHighestPosts(100);
        res.send({
            message: " No search term given, generating all",
            results: results
        });
    } else {
        let results = await PostModel.Search(searchTerm);
        if (results.length) {
            res.send({
                message: " relevent post(s) found.",
                results: results
            });
        } else if (prefix == ''){
            let results = await PostModel.GetNHighestPosts(5);
            res.send({
                message: " most highest rated posts, no results were found.",
                results: results
            });
        } else {
            let results = await PostModel.GetNHighestPrefixPosts(5, prefix);
            res.send({
                message: " most highest rated posts within catagory, no results were found.",
                results: results
            });
        }
    }
})

module.exports= router;