var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  answer: [{answer: String, num: Number}]
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
