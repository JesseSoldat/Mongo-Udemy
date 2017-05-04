it.only()    run a single test
xit()        dont run this test

describe('Creating records', () => {
	it.only('saves a user', (done) => {
		const joe = new User({ name: 'Joe'});
		joe.save()
			.then(() => {
				//Has joe been saved?
				assert(!joe.isNew);
				done();
			}).catch(e => done(e));
	});
});