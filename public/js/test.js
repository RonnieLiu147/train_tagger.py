const register = require('./register'),
chai = require('chai'),
expect = chai.expect;

chai.should();

describe('returns null if the input fields are empty',() => {
    it('null if the input fields are empty', () =>{
        register.register().should.equal(0);
    })
})