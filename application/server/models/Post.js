var db = require('../config/database');
const PostModel = {};

PostModel.search = (search) => {
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

PostModel.getNHighestPrefixPosts = (nth, prefix) => {
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

PostModel.getNHighestPosts = (nth) => {
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

PostModel.getCoursePrefix = () => {
	let baseSQL = `select distinct c.course_prefix from course c`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

module.exports = PostModel;