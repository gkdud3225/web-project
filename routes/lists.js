var express = require('express'),
    Survey = require('../models/Survey'),
    Answer = require('../models/Answer');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

function answerCount(survey_id){
  Answer.count({survey:survey_id},function(err,cnt){
    return cnt;
  });
}

router.get('/', needAuth, function(req, res, next) {
  Survey.find({user:req.user.id}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('lists', {surveys:docs});
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
  Survey.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/lists');
  });
});

module.exports = router;
