const assert = require('assert');
const User = require('../src/user');

describe('Deleting as user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done())
			.catch(e => done(e));		
	})

	it('model instance remove', (done) => {
		joe.remove()
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(user === null);
				done();
			}).catch(e => done(e));
	});

	it('class method remove', (done) => {
		User.remove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
			}).catch(e => done(e));
	});

	it('class method findOneAndRemove', (done) => {
		User.findOneAndRemove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
			}).catch(e => done(e));
	});

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user === null);
				done();
			}).catch(e => done(e));
	});


});