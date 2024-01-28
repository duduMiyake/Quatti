const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://usuario:senhadousuario@cluster0.nyfre0p.mongodb.net/?retryWrites=true&w=majority");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("quatti");
  return global.db;
}

const express = require('express');
const app = express();         
const port = 4000; 
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/* GET postagem */
router.get('/postagem/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("postagem").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("postagem").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// POST 
router.post('/postagem', async function(req, res, next){
    try{
      const postagem = req.body;
      const db = await connect();
      const result = await db.collection("postagem").insertOne(postagem);

      const postagemId = result.insertedId
      postagem.curtidas = 0

      console.log("id da postagem: " + postagemId)
      console.log("texto da postagem: " + postagem.texto)
      console.log("id do usuario: " + postagem.id_usuario)

      const novaPostagem = {
        _id: postagemId,
        texto: postagem.texto,
        like: postagem.curtidas,
        id_usuario: postagem.id_usuario,
        username: postagem.username,
        nickname: postagem.nickname
      }

      res.json(novaPostagem);
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// PUT 
router.put('/postagem/:id', async function(req, res, next){
    try{
      const postagem = req.body;
      const db = await connect();
      res.json(await db.collection("postagem").updateOne({_id: new ObjectId(req.params.id)}, {$set: postagem}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

// DELETE 
router.delete('/postagem/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("postagem").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
