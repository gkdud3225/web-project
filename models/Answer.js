var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  survey: {type: Schema.Types.ObjectId, index: true, required: true},
  answer: [{q_id:{type: Schema.Types.ObjectId, index: true, required: true},answer: String, q_title: String}]
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
