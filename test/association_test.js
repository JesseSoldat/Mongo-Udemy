const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	let joe, blogPost, comment;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		blogPost = new BlogPost({title: 'JS is fun', content: 'I love learning'});
		comment = new Comment({content: 'Nice job'});

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done())
	});

	 it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
      	// console.log(user);
        assert(user.blogPosts[0].title === 'JS is fun');
        done();
      }).catch(e => done(e));
  });

	it('saves a full relation graph', (done) => {
		User.findOne({name: 'Joe'})
			.populate({
				path: 'blogPosts',
				populate: {
					path: 'comments',
					model: 'comment',
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			})
			.then(user => {
				//Pretty print the user and all its relations
				// console.log(JSON.stringify({user}, null, 2));

				const {name} = user, 
							{title} = user.blogPosts[0],
							{content} = user.blogPosts[0].comments[0];
				// assert(user.name === 'Joe');
				// assert(user.blogPosts[0].title === 'JS is fun');
				// assert(user.blogPosts[0].comments[0].content === 'Nice job');
				// assert(user.blogPosts[0].comments[0].user.name === 'Joe');
				assert(name === 'Joe');
				assert(title === 'JS is fun');
				assert(content === 'Nice job');
				assert(user.blogPosts[0].comments[0].user.name === 'Joe');
				done();
			}).catch(err => done(err));
	});

});

