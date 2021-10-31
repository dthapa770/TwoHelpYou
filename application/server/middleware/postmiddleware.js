var PostModel = require('../models/Post');
const postMiddleware = {}

postMiddleware.getHighestRatedPost = async function(req,res,next) {
    try {
        let results = await PostModel.getNHighestPosts(5);
        res.locals.results = results;
        if (results.length == 0) {
            console.log("error in getting highest rated")
        }
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = postMiddleware;