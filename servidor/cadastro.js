const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // Apenas essa origem pode acessar
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.post('/adicionar-usuario', async (req, res) => {
    console.log('Requisição POST recebida');
  const { login, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync('bd/usuarios/usuarios.json', 'utf8'));
  const usuarioEncontrado = usuarios.find(usuario => usuario.login === login);
  if (usuarioEncontrado) {
    res.status(400).send({ erro: 'Usuário já existe!' });
  } else {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    adicionarUsuario(login, senhaCriptografada);
    res.send({ mensagem: 'Usuário adicionado com sucesso!' });
  }
});

// Permitir requisições de qualquer origem (AJUSTE EM PRODUÇÃO!)
app.use(cors());

function adicionarUsuario(login, senha) {
  console.log('Adicionando usuário:', login, senha);
  const usuarios = JSON.parse(fs.readFileSync('bd/usuarios/usuarios.json', 'utf8'));
  const novoUsuario = {
    login,
    senha
  };
  usuarios.push(novoUsuario);
  fs.writeFileSync('bd/usuarios/usuarios.json', JSON.stringify(usuarios, null, 2));
}

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});

