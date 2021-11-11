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
	let baseSQL = `select distinct c.course_prefix 
					from course c
					order by c.course_prefix;`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

/**
 * Checks if the prefix exists.
 * @param course_prefix 
 * @returns bool on if it exists
 */
PostModel.CheckCoursePrefix = async (course_prefix) => {
	let baseSQL = `select c.course_prefix
					from course c
					where c.course_prefix = ?;`;
	return db.execute(baseSQL, [course_prefix])
		.then(([ results, fields ]) => {
			if (results.length > 0)
				return Promise.resolve(true);
			else
				return Promise.resolve(false);
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Checks if the postfix exists
 * @param course_postfix 
 * @returns bool on if it exists
 */
PostModel.CheckCoursePostfix = async (course_postfix) => {
	let baseSQL = `select c.course_postfix
					from course c
					where c.course_postfix = ?;`;
	return db.execute(baseSQL, [course_postfix])
		.then(([results, fields]) => {
			if (results.length > 0)
				return Promise.resolve(true);
			else
				return Promise.resolve(false);
		})
		.catch((err) => Promise.reject(err));
}

PostModel.GetCourseID = async (course_prefix, course_postfix) => {
	let baseSQL = `select c.course_id
					from course c
					where c.course_prefix = ? and c.course_postfix = ?;`;
	return db.execute(baseSQL, [course_prefix, course_postfix])
		.then(([results, fields]) =>{
			if (results.length > 0) {
				return Promise.resolve(results[0].course_id);
			}
			else {
				return Promise.reject(-1);
			}
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Inserts a new course into the database if it does not exists.
 * @param course_prefix 
 * @param course_postfix 
 * @returns course_id
 */
PostModel.InsertCourse = async (course_prefix, course_postfix) => {
	let baseSQL = `INSERT INTO course (course_prefix, course_postfix)
					values (?,?);`;
	return db.execute(baseSQL, [course_prefix, course_postfix])
		.then(([results,fields]) => {
		if(results && results.affectedRows){
			return Promise.resolve(results.insertId);
		}else{
			return Promise.reject(-1);
		}
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Creates post offering tutoring with path to the credentials
 * needed for mod to approve post.
 * @param availability 
 * @param user_id 
 * @param course_id 
 * @param file_name 
 * @returns post_id
 */
PostModel.CreatePost = async (availability, user_id, course_id, file_name) => {
	let postSQL = `INSERT INTO post (availability, user_id, course_id)
					VALUES (?,?,?);`;
	let file_path = `documents/` + file_name;
	let fileSQL = `INSERT INTO qualification (document_path, user_id, post_id)
					VALUES (?,?,?)`;
	return db.execute(postSQL, [availability, user_id, course_id])
		.then(([post_results,post_fields]) =>{
			if (post_results && post_results.affectedRows) {
				return db.execute(fileSQL, [file_path, user_id, post_results.insertId])
				.then(([file_results, file_fields]) => {
					if (file_results && file_results.affectedRows) {
							return Promise.resolve(post_results.insertId);
					} else {
						return Promise.reject(-1);
					}
				})
				.catch((err) => Promise.reject(err));
			}	
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Confirm if username is legit and returns the id
 * @param username 
 * @returns user_id
 */
PostModel.ValidateUser = async (username) => {
	let baseSQL = `SELECT user_id 
					FROM user
					WHERE username = ?;`;
	return db.execute(baseSQL, [username])
		.then(([results, fields]) => {
			return Promise.resolve(results[0].user_id);
		})
		.catch((err) => Promise.reject(-1));
}

module.exports = PostModel;