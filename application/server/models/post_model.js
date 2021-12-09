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
 * Sorted by creation in descending order
 * @param search string of search request
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.Search = (search) => {
	let sql_search_term = '%' + search + '%'; // Variables don't follow naming convention
	let base_sql = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.user_id, u.username, u.thumbnail, avg(ifnull(r.rating,0)) as avg_rating,
					concat_ws(' ', u.first_name, u.last_name, u.username, p.availability,
					c.course_prefix, c.course_postfix)	as haystack
					from user u, course c, post p
					left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id
					having haystack like ?
					order by p.post_creation desc;`;
	return db.execute(base_sql,[ sql_search_term ])
                .then(([ results, fields ]) => {
					return Promise.resolve(results);
				})
				.catch((err) => Promise.reject(err));
};

/**
 * Function takes the prefix and utilizes it to build the query to return
 * all post with nth beign the max amount that is used to generate
 * the tutoring post/cards sorted by creation in descending order
 * @param nth how many max results is wanted
 * @param prefix course prefix of the query of interest
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.GetNRecentPrefixPosts = (nth, prefix) => {
	let base_sql = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.user_id, u.username, u.thumbnail, avg(ifnull(r.rating,0)) as avg_rating 
					from user u, course c, post p left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id 
					having c.course_prefix like ?
					order by p.post_creation desc limit ${nth};`;
	return db.execute(base_sql, [prefix])
	.then(([results, fields]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

/**
 * Function grabs all the all post with nth beign the max amount
 * that is used to generate the tutoring post/cards sorted by
 * creation in descending order
 * @param nth how many max results is wanted
 * @param prefix course prefix of the query of interest
 * @returns neccesary information to make the tutoring post/cards
 */
PostModel.GetNRecentPosts = (nth) => {
	let base_sql = `select p.post_id, c.course_prefix, c.course_postfix, p.availability,
					u.user_id, u.username, u.thumbnail, avg(ifnull(r.rating,0)) as avg_rating 
					from user u, course c, post p left join review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id and c.course_id = p.course_id and p.authorized <> 0
					group by p.post_id order by p.post_creation desc	limit ${nth};`;
	return db.execute(base_sql, [])
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
	let base_sql = `select distinct c.course_prefix 
					from course c
					order by c.course_prefix;`;
	return db.execute(base_sql, [])
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
	let base_sql = `select c.course_prefix
					from course c
					where c.course_prefix = ?;`;
	return db.execute(base_sql, [course_prefix])
		.then(([ results, fields ]) => {
			if (results.length > 0)
				return Promise.resolve(true);
			else
				return Promise.resolve(false);
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Checks if the postfix exists for the prefix
 * @param course_prefix
 * @param course_postfix 
 * @returns bool on if it exists
 */
PostModel.CheckCoursePostfix = async (course_prefix, course_postfix) => {
	let base_sql = `select c.course_postfix
					from course c
					where c.course_prefix = ? and c.course_postfix = ?;`;
	return db.execute(base_sql, [course_prefix, course_postfix])
		.then(([results, fields]) => {
			if (results.length > 0)
				return Promise.resolve(true);
			else
				return Promise.resolve(false);
		})
		.catch((err) => Promise.reject(err));
}

/**
 * Fetches the existing course id from the db
 * @param course_prefix 
 * @param course_postfix 
 * @returns course_id
 */
PostModel.GetCourseID = async (course_prefix, course_postfix) => {
	let base_sql = `select c.course_id
					from course c
					where c.course_prefix = ? and c.course_postfix = ?;`;
	return db.execute(base_sql, [course_prefix, course_postfix])
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
	let base_sql = `INSERT INTO course (course_prefix, course_postfix)
					values (?,?);`;
	return db.execute(base_sql, [course_prefix, course_postfix])
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
	let post_sql = `INSERT INTO post (availability, user_id, course_id)
					VALUES (?,?,?);`;
	let file_path = `documents/` + file_name;
	let file_sql = `INSERT INTO qualification (document_path, user_id, post_id)
					VALUES (?,?,?)`;
	return db.execute(post_sql, [availability, user_id, course_id])
		.then(([post_results,post_fields]) =>{
			if (post_results && post_results.affectedRows) {
				return db.execute(file_sql, [file_path, user_id, post_results.insertId])
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
	let base_sql = `SELECT user_id 
					FROM user
					WHERE username = ?;`;
	return db.execute(base_sql, [username])
		.then(([results, fields]) => {
			return Promise.resolve(results[0].user_id);
		})
		.catch((err) => Promise.reject(-1));
}

/**
 * Gets post id from the database
 * @param postid
 * @returns results
 */
PostModel.GetPostById=(post_id) =>{	// Variable name does not follow convention
    let base_sql=
        'SELECT u.username, p.availability, u.first_name, u.thumbnail, u.last_name, p.post_id, c.course_prefix,c.course_postfix  FROM user u JOIN post p ON p.post_id = u.user_id JOIN course c ON p.course_id = c.course_id   WHERE p.post_id = ?;'
    return db.execute(base_sql,[post_id])
        .then(([results, fields]) =>{
              return Promise.resolve(results);
        })
        .catch( err => Promise.reject(err))
}

module.exports = PostModel;