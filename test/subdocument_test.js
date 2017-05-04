const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{ title: 'PostTitle' }]
		});

		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(user.posts[0].title === 'PostTitle');
				done();
			});
	});

	it('Can add subdocuments to an existing recored', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: []
		});

		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				user.posts.push({title: 'New Post'});
				return user.save();
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(user.posts[0].title === 'New Post');
				done();
			});
	});

	it('can remove a existing subdocument', () => {
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'New Title'}]
		});

		joe.save(0)
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(user.posts.length === 0);
				done();
			});
	});
});

