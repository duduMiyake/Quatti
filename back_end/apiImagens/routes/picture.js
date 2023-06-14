const express = require("express")
const router = express.Router()

const upload = require("../config/multer")

const PictureController = require("../controllers/pictureController")

router.post("/",upload.single("file"), PictureController.create);

router.get("/:id?/:id_usuario?", PictureController.find);
//Para procurar por id de usuario precisa usar essa url: 
//http://localhost:5000/pictures?id_usuario= o id do usuario aqui

//Para procurar pelo get normal e o usar essa http://localhost:5000/pictures/id

router.delete("/:id", PictureController.remove);

router.put("/:id",upload.single("file"), PictureController.update);

module.exports = router;
// 6489c8a04d77b542c6abacbd