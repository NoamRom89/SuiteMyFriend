var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var categorySchema = new schema({
    categoryObj: Object
},{collection: 'Categories'});

//Export
exports.categorySchema = categorySchema;
