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

  Constructor.prototype.load = function() {
    var self = this;
    var params = {title:this.title};
    $.getJSON("/surveys/tasks/"+this.title, function(data) {
      self.survey = data;
      self.questions = data.questions;
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.render = function() {
    var self = this;
    $("#main").toggleClass("no-survey", (this.survey.questions.length <= 0));
    var html = _.map(this.questions, function(questions) {
      // if (self._visible(survey)) {
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
    $("#question_title").val("");
    $("#form-survey select[name='category']").val("text");
  };

  Constructor.prototype._findQuestion = function(e) {
    var el = $(e.currentTarget).closest('li');
    var id = el.data('id');
    return id;
  };

  Constructor.prototype.postSurvey = function() {
    var self = this;
    $.post("/surveys/new", $("#form-survey").serialize(), function(data) {
      self.questions.push(data.questions[self.questions.length]);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.removeSurvey = function(e) {
    var question = this._findQuestion(e);
    if (!question) {
      return;
    }
    var self = this;
    if (confirm('정말로 삭제하시겠습니까?')) {
      $.ajax({
        url: '/surveys/' + question,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          self.load();
        }
      });
    }
  };

  return Constructor;
} ();
