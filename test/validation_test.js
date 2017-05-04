const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	
	it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it('requires a user\'s name to be longer than 1 character', () => {
  	const user = new User({name: 'z'});
  	const validationResult = user.validateSync();
  	const {message} = validationResult.errors.name;

  	assert(message === 'Name must be longer than 1 character.');
  });

  it('disallows invalid records from being saved', (done) => {
  	const user = new User({name: 'z'});
  	user.save()
  		.catch((validationResult) => {
  			const {message} = validationResult.errors.name;

  			assert(message === 'Name must be longer than 1 character.');
  			done();
  		});
  });
});