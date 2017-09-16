var express = require('express');
var router = express.Router();

router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.send(docs);
  });
});

router.post('/register', function(req, res) {
  
      // Set our internal DB variable
      var db = req.db;
  
      // Get our form values. These rely on the "name" attributes
      var userName = req.body.username;
      var userEmail = req.body.email;
      var userPassword = req.body.password;
  
      // Set our collection
      var collection = db.get('usercollection');
  
      // Submit to the DB
      collection.insert({
          "username" : userName,
          "email" : userEmail,
          "password" : userPassword
      }, function (err, doc) {
          if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
          }
          else {
              // And forward to success page
              res.send(doc);
          }
      });
  });

module.exports = router;
