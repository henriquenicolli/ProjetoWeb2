var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project');

var orientacaoSchema = new mongoose.Schema({
	nome_orientador: {
		type: String,
		require: true
	},
	sala_orientador: {
		type: String,
		require: true
	},
	email_orientador: {
		type: String,
		require: true
	},
	nome_orientado: {
		type: String,
		require: true
	},
	ra_orientado: {
		type: String,
		require: true
	},
	email_orientado: {
		type: String,
		require: true
	},
	curso_orientado: {
		type: String,
		require: true
	},
	tema: {
		type: String,
		require: true
	},
	descricao: {
		type: String,
		require: true
	}
},{ collection: 'tbl_orientacao' });

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

module.exports = { Mongoose: mongoose, OrientacaoSchema: orientacaoSchema, LoginSchema: loginSchema }