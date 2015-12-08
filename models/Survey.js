var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String},
  questions: [{q_title: String, answers: [{answer: String}], num: Number}],
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
