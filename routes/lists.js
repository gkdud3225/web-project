var express = require('express'),
    Survey = require('../models/Survey');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  Survey.find({user:req.user.id}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('lists', {surveys: docs});
  });
});

router.get('/:id/edit', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    res.render('surveys', {survey: survey});
  });
});

router.delete('/:id', function(req, res, next) {
  console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
  console.log(req.params.id);
  Survey.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/lists');
  });
});

module.exports = router;