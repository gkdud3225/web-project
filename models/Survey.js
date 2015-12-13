var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  questions: [{title: String, answers: [{answer: String}], q_type: String}],
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
