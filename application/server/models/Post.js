var db = require('../config/database');
const PostModel = {};

PostModel.search = (search) => {
	let sqlSearchTerm = '%' + search + '%';
	let baseSQL = "SELECT  user.first_name,user.last_name, tutor_posting.date, \
					tutor_posting.course,tutor_posting.time,tutor_posting.class,user.photopath,\
					concat_ws(' ',user.first_name,user.last_name, tutor_posting.date, tutor_posting.course,tutor_posting.time,tutor_posting.class)\
					AS haystack\
					FROM tutor_posting\
					INNER JOIN user\
					ON user.id= tutor_posting.user_id\
					HAVING haystack like ? ;";
	return db.execute(baseSQL,[ sqlSearchTerm ])
                .then(([ results, fields ]) => {
					return Promise.resolve(results);
				})
				.catch((err) => Promise.reject(err));
};

PostModel.getNHighestPosts = (nth) => {
	// needs to be change to highest rating
	// for now set to most recent
	let baseSQL = `SELECT user.first_name,user.last_name, tutor_posting.date, \
	tutor_posting.course,tutor_posting.time,tutor_posting.class,user.photopath \
	FROM tutor_posting INNER JOIN user ON user.id= tutor_posting.user_id ORDER BY date DESC LIMIT ${nth};`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

module.exports = PostModel;