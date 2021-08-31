import { Router } from 'express'
import { loginAdmin } from "../controllers/authController";
import { getAllFileInDb, insertFile, detailFile, deleteFile, downloadFile, getAllUserFile } from '../controllers/handleFiles';
import { getAllUser, deleteUser, resetPassUser, detailUser, upgradeToAdmin } from '../controllers/userManage';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '');
    }
});

const upload = multer({storage}).single('file');

router.route("/login").post(loginAdmin);

router.route("/all").get(getAllFileInDb); // get all file in db
router.route("/userFile").get(getAllUserFile); // get all file of an user
router.route("/uploadFile").post(upload, insertFile);
router.route("/deleteFile").delete(deleteFile);
router.route("/detailFile").get(detailFile);
router.route("/downloadFile").get(downloadFile);

router.route("/user").get(getAllUser);
router.route("/user/delete").delete(deleteUser);
router.route("/user/resetPassword").post(resetPassUser);
router.route("/detailUser").get(detailUser);
router.route("/user/upgrade").post(upgradeToAdmin);

export default router;