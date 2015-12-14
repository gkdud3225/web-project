var express = require('express'),
    Survey = require('../models/Survey'),
    Answer = require('../models/Answer');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id,function(err,survey){
    Answer.count({survey:req.params.id},function(err,cnt){
      Answer.find({survey:req.params.id},function(err,answers){
        var q_titles = [];
        for(var index in survey.questions){
          if(survey.questions[index].id !== req.params.id){
            if(survey.questions[index].id){
              q_titles.push(survey.questions[index].title);
            }
          }
        }
        var q_answers = [];
        var count = 0;
        for(var k in q_titles){
          q_answers[k] = [];
          for(var i in answers){
            for(var j in answers[i].answer){
              // console.log(q_titles.indexOf(i));
              if(answers[i].answer[j].q_title === q_titles[k]){
                q_answers[k].push(answers[i].answer[j].answer);
              }
            }
          }
        }
        res.render('result', {s_title:survey.title,titles:q_titles,answers:q_answers,length:q_titles.length,count:cnt});
      });
    });
  });
});

module.exports = router;
