import { Router } from 'express';
import multer from 'multer';
import {
    insertFile, 
    getAllFile, 
    deleteFile, 
    downloadFile 
} from '../controllers/handleFiles';

const router = Router();

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '');
    }
});

const upload = multer({storage}).single('file');

router.route('/uploadFile').post(upload, insertFile);
router.route('/').get(getAllFile);
router.route('/deleteFile').delete(deleteFile);
router.route('/downloadFile').get(downloadFile);

export default router;