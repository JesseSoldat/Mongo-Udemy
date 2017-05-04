const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 1,
			message: 'Name must be longer than 1 character.'
		},
		required: [true, 'Name is required.']
	},
	likes: Number,
  posts: [PostSchema],
  blogPosts: [{
  	type: Schema.Types.ObjectId,
  	ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});


const User = mongoose.model('user', UserSchema);

module.exports = User;
