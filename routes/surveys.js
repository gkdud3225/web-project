var express = require('express'),
    User = require('../models/User'),
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
  res.render('surveys', {survey:{}});
});

router.get('/tasks/:title', needAuth, function(req, res, next) {
  Survey.findOne({title: req.params.title}, function(err, surveys) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    res.send(surveys);
  });
});

router.put('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    survey.title = req.body.title;
    survey.content = req.body.content;
    survey.save(function(err) {
      req.flash('success', '설문이 수정되었습니다.');
      Survey.findOne({title:req.body.title},function(err,data){
        res.render('survey-index',{survey:data});
      });
    });
  });
});

router.post('/', function(req, res, next) {
  var survey = new Survey ({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id
  });

  survey.save(function(err) {
    if (err) {
      return next(err);
    }
    Survey.findOne({title:req.body.title},function(err,data){
      res.render('survey-index',{survey:data});
    });
  });
});

router.post('/success', function(req, res, next) {
  res.render('survey-success',{survey_id:req.body.survey_id});
});

router.post('/new', needAuth, function(req, res, next) {
  if(req.body.category !== '객관식'){
    Survey.update({title:req.body.title}, {
      $push: { "questions": {title:req.body.question_title, q_type:req.body.category} }
    }, function(err,doc){
      Survey.findOne({title:req.body.title},function(err,survey){
        res.send(survey);
      });
    });
  }else{
    Survey.update({title:req.body.title}, {
      $push: { "questions": {title:req.body.question_title, q_type:req.body.category,answers:[{answer:req.body.answer1},{answer:req.body.answer2},{answer:req.body.answer3},{answer:req.body.answer4},{answer:req.body.answer5}]} }
    }, function(err,doc){
      Survey.findOne({title:req.body.title},function(err,survey){
        res.send(survey);
      });
    });
  }
});

router.delete('/:id', needAuth, function(req, res, next) {
  Survey.update({questions: {$elemMatch: {_id:req.params.id}}}, {$pull:{questions:{_id:req.params.id}}}, function(err, survey) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!survey) {
      return res.status(404).json({message: 'task not found'});
    }
    res.json(survey);
  });
});

module.exports = router;
