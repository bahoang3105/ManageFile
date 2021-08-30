const express = require('express');
const router = express.Router();
const controller = require("../controllers/handleFiles");
const multer = require('multer');

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

const upload = multer({storage}).single('file');

router.route("/uploadFile").post(upload, controller.uploadFile);
router.route("/").get(controller.getAllFile);
router.route("/deleteFile").delete(controller.deleteFile);
router.route("detailFile").get(controller.detailFile);

module.exports = router;