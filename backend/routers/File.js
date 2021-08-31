import { Router } from 'express';
import { insertFile, getAllFile, deleteFile, detailFile, downloadFile } from "../controllers/handleFiles";
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '');
    }
});

const upload = multer({storage}).single('file');

router.route("/uploadFile").post(upload, insertFile);
router.route("/").get(getAllFile);
router.route("/deleteFile").delete(deleteFile);
router.route("/detailFile").get(detailFile);
router.route("/downloadFile").get(downloadFile);

export default router;