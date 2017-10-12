var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

// Set our internal DB Schema

// User Schema
var userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  analyst: String,
  uploadArticle: Array,
  authority: Number,
  isTop: Number,
}, {collection: 'users'});
var user = mongoose.model('user', userSchema);

// analyst Schema
var analystSchema = new Schema({
  aim: String,
  method: Array,
  Metric: String,
  participants: Array,
  benefitOrOutcome: String,
  contextWhere: String,
  contextWhen: String,
  contextHow: String,
  contextWhatOne: String,
  contextWhatTwo: String,
  result: String,
  rater: String,
  integrity: String,
}, {collection: 'analyst'});
var analyst = mongoose.model('analyst', analystSchema);

// uploadArticle Schema
var uploadArticleSchema = new Schema({
  author: String,
  journal: String,
  month: String,
  number: String,
  pages: String,
  rater: String,
  title: String,
  volume: String,
  year: String,
  userId: String,
  userName: String,
  createTime: String,
  isTop: Number,
}, {collection: 'uploadarticle'});
var uploadArticle = mongoose.model('uploadArticle', uploadArticleSchema);

// news Schema
var newsSchema = new Schema({
  context: String,
  createTime: String,
  timestamp: Number,
}, {collection: 'news'});
var news = mongoose.model('news', newsSchema);


router.get('/', function(req, res) {
  res.render('login');
});

router.get('/index', function(req, res) {
  res.render('index');
});

router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/analyst', function(req, res) {
  var id = req.query.id;
  var userID = req.query.userId;
  if (id) {
    analyst.findById(id, function(err, data) {
      res.render('analyst', {content: data, id: id, userID: userID});
    });
  } else {
    res.render('analyst', {content: {}, id: 0, userID:userID});
  }

});
// news Router
router.get('/news', function(req, res) {
  res.render('news');
});


// login Router
router.get('/login', function(req, res) {
  res.render('login');
});

// register Router
router.get('/register', function(req, res) {
  res.render('register');
});

// select Router
router.get('/selectWhere', function(req, res) {
  res.render('selectWhere');
});

// user Router
router.get('/user', function(req, res) {
  var userId = req.query.userId;
  var searchName = req.query.searchName ? req.query.searchName : '';
  var page = req.query.page ? req.query.page : 1;
  var size = 10;
  var db_skip = parseInt(size) * (parseInt(page) - 1);
  if (userId) {
    user.findById(userId, function(err, userInfo) {
      user.find({'username':{'$regex':searchName}}).skip(db_skip).limit(size).sort({'isTop': -1}).exec(function(err, data) {
        res.render('user', {content: data,page:page,user:userInfo, searchText:searchName});
      });
    });
  } else {
    res.send('params Error');
  }
});

// articleList Router
router.get('/articleList', function(req, res) {
  var userId = req.query.userId;
  var searchName = req.query.searchName ? req.query.searchName : '';
  var page = req.query.page ? req.query.page : 1;
  var size = 10;
  var db_skip = parseInt(size) * (parseInt(page) - 1);
  if (userId) {
    user.findById(userId, function(err, userInfo) {
      uploadArticle.find({'userName':{'$regex':searchName}}).skip(db_skip).limit(size).sort({'isTop': -1}).exec(function(err, data) {
        res.render('articleList', {content: data,page:page,user:userInfo,searchText:searchName});
      });
    });
  } else {
    res.send('params Error');
  }

});

router.get('/homeNews', function(req, res) {
  news.findOne().sort({'timestamp': -1}).exec(function(err,data) {
    res.render('homeNews', {content: data});
  });
});

// select Router
router.get('/viewArticle', function(req, res) {
  var articleId = null;
  if (req.query.aid) {
    articleId = req.query.aid;

    uploadArticle.findById(articleId, function(err, data) {
      res.render('article', {content: data});
    });

  } else {
    res.render('article', {content: {}});
  }
});

// viewAnalyst Router
router.get('/viewAnalyst', function(req, res) {
  var analystId = null;
  if (req.query.aid) {
    analystId = req.query.aid;

    analyst.findById(analystId, function(err, data) {
      res.render('viewAnalyst', {content: data});
    });

  } else {
    res.render('viewAnalyst', {content: {}});
  }
});


// removeAnalyst Router
router.get('/removeArticle', function(req, res) {
  var articleId = null;
  var userId = req.query.userId;
  if (req.query.id) {
    articleId = req.query.id;

    uploadArticle.remove({'_id': articleId}, function(err, data) {
      user.findByIdAndUpdate(userId, {'$pull':{'uploadArticle':mongoose.Types.ObjectId(articleId)}}, function(err, updateData) {
        res.render('result', {resultText: 'Remove Success'});
      });
    });

  } else {
    res.render('result', {resultText: 'Params Error'});
  }
});

// putTop Router
router.get('/putTop', function(req, res) {
  var userId = req.query.userId;
  var localId = req.query.localId;
  var result = {
    code: 0,
    msg: '',
  };
  user.findById(localId, function(err, userInfo) {
    user.findByIdAndUpdate(userId,{'$set': {'isTop': 1}},function(err, data) {
      user.find().skip(0).limit(10).sort({'isTop': -1}).exec(function(err, data) {
        res.render('user', {content: data,page:1,user: userInfo});
      });
    });
  });
});

// channelPutTop Router
router.get('/channelPutTop', function(req, res) {
  var userId = req.query.userId;
  var localId = req.query.localId;
  var result = {
    code: 0,
    msg: '',
  };

  user.findById(localId, function(err, userInfo) {
    user.findByIdAndUpdate(userId,{'$set': {'isTop': 0}},function(err, data) {
      user.find().skip(0).limit(10).sort({'isTop': -1}).exec(function(err, data) {
        res.render('user', {content: data,page:1,user: userInfo});
      });
    });
  });

});

// putTop Router
router.get('/putTopArticle', function(req, res) {
  var aId = req.query.aId;
  var localId = req.query.localId;
  var result = {
    code: 0,
    msg: '',
  };
  user.findById(localId, function(err, userInfo) {
    uploadArticle.findByIdAndUpdate(aId,{'$set': {'isTop': 1}},function(err, data) {
      uploadArticle.find().skip(0).limit(10).sort({'isTop': -1}).exec(function(err, data) {
        res.render('articleList', {content: data,page:1,user: userInfo});
      });
    });
  });
});

// channelPutTop Router
router.get('/channelPutTopArticle', function(req, res) {
  var aId = req.query.aId;
  var localId = req.query.localId;
  var result = {
    code: 0,
    msg: '',
  };

  user.findById(localId, function(err, userInfo) {
    uploadArticle.findByIdAndUpdate(aId,{'$set': {'isTop': 0}},function(err, data) {
      uploadArticle.find().skip(0).limit(10).sort({'isTop': -1}).exec(function(err, data) {
        res.render('articleList', {content: data,page:1,user: userInfo});
      });
    });
  });

});


// article Router
router.get('/uploadArticle', function(req, res) {
  res.render('uploadArticle', {content: {
    author: '',
    title: '',
    journal: '',
    year: '',
    volume: '',
    number: '',
    pages: '',
    month: '',
    note: '',
  }});
});

router.get('/result', function(req, res) {
  res.render('result');
});

/**
 * [login Api]
 * @param  {[String]} req [username]
 * @param  {[String]} req [userpassword]
 * @return {[page]}     [analyst page]
 */
router.post('/userLogin', function(req, res) {
  var username = req.body.data.username;
  var userpassword = req.body.data.userpassword;
  var result = {
    code: 0,
    data: '',
    msg: '',
  };
  if (!username || !userpassword) {
    result.code = 1;
    result.msg = 'parameter error';
    res.send(result);
  } else {

    user.findOne({'username': username}, function(err, backData) {
      if (err) {
        res.send('Find Error');
      }

      if (!backData) {
        user.findOne({'email': username}, function(err, backEmailData) {
          if (!backEmailData) {
            result.code = 1;
            result.msg = 'user does not exist';
            res.send(result);
          } else if (backEmailData.password !== userpassword) {
            result.code = 1;
            result.msg = 'password error';
            res.send(result);
          } else {
            result.msg = 'login success';
            result.data = backEmailData;
            res.send(result);
          }
        })
      } else if (backData.password !== userpassword) {
        result.code = 1;
        result.msg = 'password error';
        res.send(result);
      } else {
        result.msg = 'login success';
        result.data = backData;
        res.send(result);
      }
    });
  }
});

/**
 * [news Api]
 */
router.post('/pushNews', function(req, res) {
  var content = req.body.content;
  var obj = {};
  obj.context = content;
  obj.createTime = new Date().toDateString();
  obj.timestamp = new Date().getTime();
  if (content) {
    news.create(obj, function(err, data) {
      if (err) console.log(err);
      res.render('result', {resultText: 'Release Success'});
    });
  } else {
    res.send('please Enter content');
  }

});


/**
 * [register Api]
 * @param  {[String]} req [username]
 * @param  {[String]} req [useremail]
 * @param  {[String]} req [userpassword]
 * @return {[page]}     [login page]
 */
router.post('/registerUser', function(req, res) {
  var username = req.body.data.username;
  var useremail = req.body.data.useremail;
  var userpassword = req.body.data.userpassword;
  var authority = req.body.data.authority;
  var result = {
    code: 0,
    data: '',
    msg: '',
  };
  if (!username || !useremail || !userpassword) {
    result.code = 1;
    result.msg = 'parameter error';
    res.send(result);
  } else {
    var userObject = {
      'username':username,
      'email': useremail,
      'password': userpassword,
      'analyst': '',
      'uploadArticle': [],
      'authority': authority,
    };
    user.findOne({'username': username}, function(err, findData) {
      if (findData) {
        result.code = 1;
        result.msg = 'User already exists';
        res.send(result);
      } else {
        user.create(userObject, function(err, userData) {
          if (err) {
            res.send('Save Error')
          }
          result.data = userData;
          result.msg = 'create success';
          res.send(result);
        });
      }
    })
  }
});

/**
 * [submit analyst Api]
 * @return {[page]}     [analyst page]
 */
 router.post('/submitAnalyst', function(req, res) {
   var userId = req.body.userId;
   var analystId = req.body.analystId;
   var isUpdate = analystId == 0 ? false : true;
   var isSave = req.body.isSave;
   var data = {
     aim: '',
     method: [],
     Metric: '',
     participants: [],
     benefitOrOutcome: '',
     contextWhere: '',
     contextWhen: '',
     contextHow: '',
     contextWhatOne: '',
     contextWhatTwo: '',
     result: '',
     rater: '',
     integrity: '',
   };
   data.aim = req.body.aimtext ? req.body.aimtext : '';
  //  filter Method
   for (var x in req.body) {
     if (x == 'caseStudy') data.method.push(req.body[x]);
     if (x == 'fieIdObservation') data.method.push(req.body[x]);
     if (x == 'experiment') data.method.push(req.body[x]);
     if (x == 'interview') data.method.push(req.body[x]);
     if (x == 'survey') data.method.push(req.body[x]);
   }
   data.Metric = req.body.metrictext ? req.body.metrictext : '';
   // filter Participants
   for (var x in req.body) {
     if (x == 'undergraduate') data.participants.push(req.body[x]);
     if (x == 'postgraduate') data.participants.push(req.body[x]);
     if (x == 'practioners') data.participants.push(req.body[x]);
   }
   data.benefitOrOutcome = req.body.benefitOrOutcome ? req.body.benefitOrOutcome : '';

   data.contextWhere = req.body.contextWhere ? req.body.contextWhere : '';

   data.contextWhen = req.body.contextWhen ? req.body.contextWhen : '';

   data.contextHow = req.body.contextHow ? req.body.contextHow : '';

   data.contextWhatOne = req.body.contextWhatOne ? req.body.contextWhatOne : '';

   data.contextWhatTwo = req.body.contextWhatTwo ? req.body.contextWhatTwo : '';

   data.result = req.body.result ? req.body.result : '';

   data.rater = req.body.rater ? req.body.rater : '';

   data.integrity = req.body.integrity ? req.body.integrity : '';

   if (isUpdate) {
     analyst.findByIdAndUpdate(analystId, {'$set': data},function(err, updateData) {
       if (err) console.log('update error');
       user.findByIdAndUpdate(userId, {'analyst': updateData._id}, function() {
         if (isSave == 1) {
           analyst.findById(analystId, function(err, newdata) {
             res.render('analyst', {content: data, id: analystId, userID: userId});
           })
         } else {
           res.render('result', {resultText: 'Update Success'});
         }
       });
     });
   } else {
     analyst.create(data, function(err, createData) {
       if (err) console.log('create error');
       user.findByIdAndUpdate(userId, {'analyst': createData._id}, function() {
         if (isSave == 1) {
           analyst.findById(analystId, function(err, newdata) {
             res.render('analyst', {content: data, id: analystId, userID: userId});
           })
         } else {
           res.render('result', {resultText: 'Submit Success'});
         }
       });
     });
   }

 });

 /**
  * [submit uploadArticle Api]
  * @return {[page]}     [analyst page]
  */
  router.post('/submitUploadArticle', function(req, res) {
    var userId = req.body.userId;
    var uploadArticleObject = {};
    for (var x in req.body) {
      uploadArticleObject[x] = req.body[x];
    }
    uploadArticleObject.createTime = new Date().toDateString();
    uploadArticle.create(uploadArticleObject, function(err, createData) {
      if (err) console.log('create error');
      user.findByIdAndUpdate(userId, {'$push':{'uploadArticle': createData._id}}, function() {
        res.render('result', {resultText: 'Submit Success'});
      });
    })
  });

  /**
   * [ uploadArticle File Api]
   * @return {[JSON]}     [analyst page]
   */
  router.post('/upload', upload.single('recfile'), function (req, res, next) {
    var filePath = req.file.path;
    if (req.file.originalname.split('.')[1] != 'bib' && req.file.originalname.split('.')[1] != 'txt') {
      res.send('files Type error');
      return;
    }
    fs.readFile(filePath, function(err, data) {
      function filterComma(str) {
        if (str) {
          return str.substr(0, str.length - 1).split('= ')[1]
        } else {
          return '';
        }
      }
      var fileContent = data.toString();
      var authorReg = new RegExp("author([\\s\\S]*?),", 'g');
      var titleReg = new RegExp("title([\\s\\S]*?),", 'g');
      var journalReg = new RegExp("journal([\\s\\S]*?),", 'g');
      var yearReg = new RegExp("year([\\s\\S]*?),", 'g');
      var volumeReg = new RegExp("volume([\\s\\S]*?),", 'g');
      var numberReg = new RegExp("number([\\s\\S]*?),", 'g');
      var pagesReg = new RegExp("pages([\\s\\S]*?),", 'g');
      var monthReg = new RegExp("month([\\s\\S]*?),", 'g');
      var noteReg = new RegExp("note([\\s\\S]*?),", 'g');
      var author = fileContent.match(authorReg) ? fileContent.match(authorReg)[0] : '';
      if (author) {
        if (author.split('{')[1]) {
          author = author.split('{')[1].split('}')[0];
        } else {
          author = filterComma(author);
        }
      }
      var title = fileContent.match(titleReg) ? fileContent.match(titleReg)[0] : '';
      if (title) {
        if (title.split('{')[1]) {
          title = title.split('{')[1].split('}')[0];
        } else {
          title = filterComma(title);
        }
      }
      var journal = fileContent.match(journalReg) ? fileContent.match(journalReg)[0] : '';
      if (journal) {
        if (journal.split('{')[1]) {
          journal = journal.split('{')[1].split('}')[0];
        } else {
          journal = filterComma(journal);
        }
      }
      var year = fileContent.match(yearReg) ? fileContent.match(yearReg)[0] : '';
      if (year) {
        if (year.split('{')[1]) {
          year = year.split('{')[1].split('}')[0];
        } else {
          year = filterComma(year);
        }
      }
      var volume = fileContent.match(volumeReg) ? fileContent.match(volumeReg)[0] : '';
      if (volume) {
        if (volume.split('{')[1]) {
          volume = volume.split('{')[1].split('}')[0];
        } else {
          volume = filterComma(volume);
        }
      }
      var number = fileContent.match(numberReg) ? fileContent.match(numberReg)[0] : '';
      if (number) {
        if (number.split('{')[1]) {
          number = number.split('{')[1].split('}')[0];
        } else {
          number = filterComma(number);
        }
      }
      var pages = fileContent.match(pagesReg) ? fileContent.match(pagesReg)[0] : '';
      if (pages) {
        if (pages.split('{')[1]) {
          pages = pages.split('{')[1].split('}')[0];
        } else {
          pages = filterComma(pages);
        }
      }
      var month = fileContent.match(monthReg) ? fileContent.match(monthReg)[0] : '';
      if (month) {
        if (month.split('{')[1]) {
          month = month.split('{')[1].split('}')[0];
        } else {
          month = filterComma(month);
        }
      }
      var note = fileContent.match(noteReg) ? fileContent.match(noteReg)[0] : '';
      if (note) {
        if (note.split('{')[1]) {
          note = note.split('{')[1].split('}')[0];
        } else {
          note = filterComma(note);
        }
      }
      var obj = {
        'author': author,
        'title': title,
        'journal': journal,
        'year': year,
        'volume': volume,
        'number': number,
        'pages': pages,
        'month': month,
        'note': note,
      };
      res.render('uploadArticle', {content: obj});
    });
  });


module.exports = router;
