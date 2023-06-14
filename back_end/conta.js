const { MongoClient, ObjectId } = require("mongodb");
async function connect() {
  if (global.db) return global.db;
  const conn = await MongoClient.connect("mongodb+srv://quatti:senhadoquatti@cluster0.nyfre0p.mongodb.net/?retryWrites=true&w=majority");
  if (!conn) return new Error("Can't connect");
  global.db = await conn.db("quatti");
  return global.db;
}

const express = require('express');
const app = express();
const port = 3000; //porta padrão
const jwt = require('jsonwebtoken')
const SECRET = 'cotton-crayon'

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//definindo as rotas
const router = express.Router();

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) {
    return res.status(401).json({ erro: 'Token nao achado'})
  }
  try {
    const decoded = jwt.verify(token, SECRET); 
    req.usuarioId = decoded.userId;
    next();

  } catch (ex) {
    console.error(ex);
    return res.status(401).json({ erro: 'Token inválido' });
  }
}


router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/* GET conta */

//GET todos
router.get('/conta', async function (req, res, next) {
  try {
    const db = await connect();
      res.json(await db.collection("conta").find().toArray());
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//GET id
router.get('/conta/:id', verificarToken, async function (req, res, next) {
  try {
    const db = await connect();
      res.json(await db.collection("conta").findOne({ _id: new ObjectId(req.params.id) }));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//GET conta email 
router.get('/conta/email/:email', async function (req, res, next) {
  try {
    const db = await connect();
    res.json(await db.collection("conta").find({ email: req.params.email }).toArray());
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

// POST /conta
router.post('/conta', async function (req, res, next) {
  try {
    const conta = req.body;
    const db = await connect();
    const result = await db.collection("conta").insertOne(conta);

    const usuarioId = result.insertedId;
    console.log("id usuario: " + usuarioId)
    console.log("conta "+conta.email)

    const token = jwt.sign({ userId: usuarioId, email: conta.email, username: conta.username, nickname: conta.nickname }, SECRET, { expiresIn: 300 });
    const novaConta = {
      _id: usuarioId,
      email: conta.email,
      username: conta.username,
      nickname: conta.nickname,
      password: conta.password ,
      token: token
    }

    novaConta.token = token
    res.json(novaConta);
  }
  catch (ex) {
  console.log(ex);
  res.status(400).json({ erro: `${ex}` });
}
});

//post para o login (assinatura do token)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connect();
    const user = await db.collection("conta").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' }); //404 erro de nao encontrado
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Senha incorreta' });  //401 erro de autorizacao invalida
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' }); //500 erro no servidor
  }
});


// PUT /conta/{id}
router.put('/conta/:id', async function (req, res, next) {
  try {
    const conta = req.body;
    const db = await connect();
    res.json(await db.collection("conta").updateOne({ _id: new ObjectId(req.params.id) }, { $set: conta }));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

// DELETE /conta/{id}
router.delete('/conta/:id', async function (req, res, next) {
  try {
    const db = await connect();
    const contaExcluida = await db.collection("conta").findOneAndDelete({ _id: new ObjectId(req.params.id) });  
    const nomeConta = contaExcluida.value.nickname;
    res.json({ mensagem: `Conta ${nomeConta} excluída com sucesso!`, nickname: nomeConta });
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');