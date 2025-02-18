const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir o modelo de usuário
const usuarioSchema = new mongoose.Schema({
  nomeUsuario: String,
  email: String,
  senha: String
});

// Criar o modelo de usuário
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Função para criar um novo usuário
app.post('/cadastro', (req, res) => {
  const { nomeUsuario, email, senha } = req.body;

  // Validar os dados
  if (!nomeUsuario || !email || !senha) {
    return res.status(400).send({ erro: 'Dados inválidos' });
  }

  // Criar o usuário
  const novoUsuario = new Usuario({ nomeUsuario, email, senha });
  novoUsuario.senha = bcrypt.hashSync(senha, 10);

  // Armazenar o usuário
  novoUsuario.save((err) => {
    if (err) {
      return res.status(500).send({ erro: 'Erro ao armazenar o usuário' });
    }

    return res.send({ sucesso: true });
  });
});

// Função para autenticar um usuário
app.post('/autenticar', (req, res) => {
  const { nomeUsuario, senha } = req.body;

  // Validar os dados
  if (!nomeUsuario || !senha) {
    return res.status(400).send({ erro: 'Dados inválidos' });
  }

  // Encontrar o usuário
  Usuario.findOne({ nomeUsuario }, (err, usuario) => {
    if (err) {
      return res.status(500).send({ erro: 'Erro ao encontrar o usuário' });
    }

    if (!usuario) {
      return res.status(404).send({ erro: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).send({ erro: 'Senha inválida' });
    }

    return res.send({ sucesso: true });
  });
});