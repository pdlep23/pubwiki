const mongoose = require('mongoose');

const wikiSchema = new mongoose.Schema({
	title:{type: String, required: true, maxlength: 25},
	category: {type: String, required: true, enum: ['Technology', 'Arts', 'Science', 'Math', 'Literature']},
	author: {type: String, required: true, maxlength: 25},
	urlName: {type: String, unique: true, match: /^[a-zA-Z0-9-_]+$/, required: true, maxlength: 25},
	html: {type: String, required: true},
	password: {type: String, required: true},
	pageViews: {type: Number, default: 0},
	createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now}
});

const Wiki = mongoose.model('Wiki', wikiSchema);

module.exports = Wiki;