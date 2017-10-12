var expect = require('chai').expect;

var axios = require('axios');

var testUserId = '59d7730b7027f1bf4a437077';

describe('evidenceRouter', function() {


  it('getEvidenceList_hasUserID', function() {
    return axios.get('http://localhost:3000/user?userId=' + testUserId).then(function(res) {
      expect(res.data).to.not.be.equal('params Error');
    });
  });


  it('getEvidenceList_noUserID', function() {
    return axios.get('http://localhost:3000/user').then(function(res) {
      expect(res.data).to.be.equal('params Error');
    });
  });

});


describe('articleRouter', function() {


  it('getArticleList_hasUserID', function() {
    return axios.get('http://localhost:3000/articleList?userId=' + testUserId).then(function(res) {
      expect(res.data).to.not.be.equal('params Error');
    });
  });


  it('getArticleList_noUserID', function() {
    return axios.get('http://localhost:3000/articleList').then(function(res) {
      expect(res.data).to.be.equal('params Error');
    });
  });

});


describe('loginRouter', function() {


  it('login_noUserName', function() {
    return axios.post('http://localhost:3000/userLogin',{
      data: {
        password:'test',
      },
    }).then(function(res) {
      expect(res.data.code).to.be.equal(1);
    });
  });

  it('login_noUserPassword', function() {
    return axios.post('http://localhost:3000/userLogin',{
      data: {
        username: 'test',
      },
    }).then(function(res) {
      expect(res.data.code).to.be.equal(1);
    });
  });


});


describe('registerUserRouter', function() {


  it('registerUser_noParams', function() {
    return axios.post('http://localhost:3000/registerUser',{
      data: {
      },
    }).then(function(res) {
      expect(res.data.code).to.be.equal(1);
    });
  });


});

describe('pushNewsRouter', function() {


  it('ReleaseNews_checkContent', function() {
    return axios.post('http://localhost:3000/pushNews',{
      data: {
      },
    }).then(function(res) {
      expect(res.data).to.be.equal('please Enter content');
    });
  });


});
