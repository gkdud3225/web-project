/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
var TaskController = function() {
  function setAjaxHandler() {
    $( document ).ajaxStart(function() {
      $("#main").addClass("loading");
    }).ajaxStop(function() {
      $("#main").removeClass("loading");
    });
  }
/*
  function checked(type, value) {
    var e = $("." + type + " .option[data-value='" + value + "']");
    return e.hasClass('selected');
  }
*/
  var Constructor = function () {
    var self = this;
    setAjaxHandler();
    this.title = ($("#title").val());
    this.surveyTemplate = _.template($("#survey-template").html());
    this.load();
    $("#post-survey").click(function() {
      self.postSurvey();
    }.bind(this));
  };
/*
  Constructor.prototype._visible = function(survey) {
    if (_.includes(['텍스트', '단락텍스트', '객관식'], survey.quetions.q_type)) {
      if (!checked('category', survey.quetions.q_type)) {
        return false;
      }
    }
    return true;
  };
*/
  Constructor.prototype.load = function() {
    var self = this;
    var params = {title:this.title};
    $.getJSON("/surveys/tasks/"+this.title, function(data) {
      self.survey = data;
      self.questions = data.questions;
      console.log(self.survey.questions.length);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.render = function() {
    var self = this;
    console.log('length:'+this.survey.questions.length);
    $("#main").toggleClass("no-survey", (this.survey.questions.length <= 0));
    var html = _.map(this.questions, function(questions) {
      // if (self._visible(survey)) {
      console.log('render_test_test');
      console.log(questions);
      if(questions){
        return self.surveyTemplate(questions);
      }else{
        return "";
      }
    });
    $("ul.surveys").html(html.join("\n"));
    $(".surveys .remove").click(self.removeSurvey.bind(this));
  };

  Constructor.prototype.clearForm = function() {
    // $("#question_title").val("");
    // $("#form-survey select[name='category']").val("text");
  };

  Constructor.prototype._findQuestion = function(e) {
    var el = $(e.currentTarget).closest('li');
    var id = el.data('id');
    return id;
  };
/*
  Constructor.prototype.postDone = function(e) {
    var task = this._findTask(e);
    if (!task) {
      return;
    }
    var self = this;
    $.ajax({
      url: '/tasks/' + task.id,
      method: 'PUT',
      dataType: 'json',
      data: {
        done: task.done ? false : true
      },
      success: function(data) {
        task.done = data.done;
        self.render();
      }
    });
  };
*/
  Constructor.prototype.postSurvey = function() {
    var self = this;
    console.log('test');
    $.post("/surveys/new", $("#form-survey").serialize(), function(data) {
      console.log('data_questions:');
      console.log(data.questions);
      console.log('question:');
      console.log(data.questions[self.questions.length]);
      self.questions.push(data.questions[self.questions.length]);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.removeSurvey = function(e) {
    var question = this._findQuestion(e);
    if (!question) {
    confirm("zzzzzzzzzzzz");
      return;
    }
    var self = this;
    confirm(question);
    if (confirm('정말로 삭제하시겠습니까?')) {
      $.ajax({
        url: '/surveys/' + question,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          confirm(data);
          self.load();
        }
      });
    }
  };

  return Constructor;
} ();
