var db = require('../config/database');
const PostModel = {};

PostModel.search = (search) => {
	let sqlSearchTerm = '%' + search + '%';
	let baseSQL = `select p.post_id, p.course_prefix, p.course_postfix, p.date, p.time,
					u.first_name, u.photopath, avg(r.rating) as avg_rating,
					concat_ws(' ', u.first_name, u.last_name, u.username, p.date,
					p.course_prefix, p.course_postfix, p.time)	as haystack
					from 648test.user u, 648test.post p
					left join 648test.review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id
					group by p.post_id
					having haystack like ?
					order by avg_rating desc;`;
	return db.execute(baseSQL,[ sqlSearchTerm ])
                .then(([ results, fields ]) => {
					return Promise.resolve(results);
				})
				.catch((err) => Promise.reject(err));
};

PostModel.getNHighestPosts = (nth) => {
	let baseSQL = `select p.post_id, p.course_prefix, p.course_postfix, p.date, p.time, u.first_name, u.photopath, avg(r.rating) as avg_rating
					from 648test.user u, 648test.post p left join 648test.review r 
					on r.post_id = p.post_id
					where u.user_id = p.user_id
					group by p.post_id order by avg_rating desc	limit ${nth};`;
	return db.execute(baseSQL, [])
	.then(([results, []]) => {
		return Promise.resolve(results);
	})
	.catch((err) => Promise.reject(err));
};

module.exports = PostModel;