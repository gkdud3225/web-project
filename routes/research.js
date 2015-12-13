var express = require('express'),
    Survey = require('../models/Survey'),
    Answer = require('../models/Answer');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id,function(err,survey){
    res.render('research',{survey:survey});
  });
});

router.get('/test/:id', function(req, res, next) {
  Survey.findById(req.params.id,function(err,survey){
    res.json(survey);
  });
});

// var schema = new Schema({
//   survey: {type: Schema.Types.ObjectId, index: true, required: true},
//   answer: [{q_id:{type: Schema.Types.ObjectId, index: true, required: true},answer: String}]
// }, {
//   toJSON: {virtuals: true},
//   toObject: {virtuals: true}
// });
router.post('/new', function(req, res, next) {
  console.log(req.body);
  Survey.findById(req.body.survey_id,function(err,survey){
    var answers = [];
    for(var i in survey.questions){
      if(survey.questions[i].id){
        if(survey.questions[i].id !== req.body.survey_id){
          for(var j in req.body.answer_id){
            if(survey.questions[i].id === req.body.answer_id[j]){
              answers.push({q_id:req.body.answer_id[j],q_title:survey.questions[i].title,answer:req.body.answer[j]});
            }
          }
        }
      }
    }
    var answer = new Answer ({
      survey:req.body.survey_id,
      answer:answers
    });
    answer.save(function(err) {
      if (err) {
        return next(err);
      }
      res.render('research-success',{survey:survey,answer:answer});
    });
  });
});

module.exports = router;
