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
 * File: post_model.js
 * 
 * Description: builds query to be sent to database and returns
 * 				the results of the queries.
 *****************************************************************************/

var db = require('../config/database');
const PostModel = {};

/**
 * Functions takes a string and builds a query to match the information
 * and returns results that is used to make the tutoring post/cards.
 * Sorted by rating in descending order
 * @param search string of search request
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.Search = (search) => {
	let sqlSearchTerm = '%' + search + '%';
	let baseSQL = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.first_name, u.photopath, avg(ifnull(r.rating,0)) as avg_rating,
					concat_ws(' ', u.first_name, u.last_name, u.username, p.availability,
					c.course_prefix, c.course_postfix)	as haystack
					from user u, course c, post p
					left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id
					having haystack like ?
					order by avg_rating desc;`;
	return db.execute(baseSQL,[ sqlSearchTerm ])
                .then(([ results, fields ]) => {
					return Promise.resolve(results);
				})
				.catch((err) => Promise.reject(err));
};

/**
 * Function takes the prefix and utilizes it to build the query to return
 * all post with nth beign the max amount that is used to generate
 * the tutoring post/cards sorted by rating in descending order
 * @param nth how many max results is wanted
 * @param prefix course prefix of the query of interest
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.GetNHighestPrefixPosts = (nth, prefix) => {
	let baseSQL = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.first_name, u.photopath, avg(ifnull(r.rating,0)) as avg_rating 
					from user u, course c, post p left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id 
					having c.course_prefix like ?
					order by avg_rating desc limit ${nth};`;
	return db.execute(baseSQL, [prefix])
	.then(([results, fields]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

/**
 * Function grabs all the all post with nth beign the max amount
 * that is used to generate the tutoring post/cards sorted by
 * rating in descending order
 * @param nth how many max results is wanted
 * @param prefix course prefix of the query of interest
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.GetNHighestPosts = (nth) => {
	let baseSQL = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.first_name, u.photopath, avg(ifnull(r.rating,0)) as avg_rating 
					from user u, course c, post p left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id order by avg_rating desc	limit ${nth};`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

/**
 * Function that is used to query the database to get all course prefix
 * used to generate the drop down menu
 * @returns neccesary information needed to load the drop down menu
 */
PostModel.GetCoursePrefix = () => {
	let baseSQL = `select distinct c.course_prefix from course c`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

module.exports = PostModel;