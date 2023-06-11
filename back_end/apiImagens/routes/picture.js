const express = require("express")
const router = express.Router()

const upload = require("../config/multer")

const PictureController = require("../controllers/pictureController")

router.post("/",upload.single("file"), PictureController.create);

router.get("/:id?", PictureController.find);

router.delete("/:id", PictureController.remove);

router.put("/:id",upload.single("file"), PictureController.update);

module.exports = router;