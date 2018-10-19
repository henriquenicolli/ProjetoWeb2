var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/project');
mongoose.connect('mongodb://rafaelhenriquedb:software2014@ds053216.mlab.com:53216/rafaelhenriquedb');

var loginSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
},{ collection: 'tbl_login' });

module.exports = { Mongoose: mongoose, LoginSchema: loginSchema }