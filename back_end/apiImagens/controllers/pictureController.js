const Picture = require("../models/Picture");

const fs = require("fs")

exports.create = async (req, res) => {

  try {

    const { name, id_usuario } = req.body
    console.log("nome foto: " + name + "id usuario: "+ id_usuario)

    const file = req.file

    const picture = new Picture({
      name,
      src: file.path,
      id_usuario,
    });

    await picture.save();

    res.json({ picture, msg: "Imagem salva com sucesso!" })

  }
  catch (error) {
    res.status(500).json({ message: "Erro ao salvar imagem." })
  }
};
//get padrao da api
exports.find = async (req, res) => {
  try {
    if (req.params.id) {
      const picture = await Picture.findById(req.params.id);

      if (req.query.id_usuario) {
        picture.id_usuario = req.query.id_usuario;
      }

      res.json(picture);
    } else if (req.query.id_usuario) {
      const pictures = await Picture.find({ id_usuario: req.query.id_usuario });

      res.json(pictures);
    } else {
      const pictures = await Picture.find();

      res.json(pictures);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imagens." });
  }
};


//Versao antiga do find, sem o id_usuario
// exports.find = async (req, res) => {
//   try {
//     if (req.params.id) {
//       const picture = await Picture.findById(req.params.id)

//       res.json(picture)

//     } else {
//       const pictures = await Picture.find()

//       res.json(pictures)
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao buscar imagens." })
//   }
// }

exports.remove = async (req, res) => {
  try {

    const picture = await Picture.findById(req.params.id);

    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    fs.unlink(picture.src);

    await picture.remove();

    res.json({ message: "Imagem removida com sucesso" });

  } catch (error) {

    res.status(500).json({ message: "Erro ao remover a imagem" });
  }
};

exports.update = async (req, res) => {
    try {
    const {name} = req.body

    const file = req.file

    const picture = await Picture.findById(req.params.id);

    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    picture.src = file.path
    picture.name = name

    await picture.save();
    
    res.json({ picture, message: "Imagem atualizada com sucesso" });

  } catch (error) {
    console.log(error)
    console.log(req.body);
    res.status(500).json({ message: "Erro ao atualizar a imagem" });
  }
};