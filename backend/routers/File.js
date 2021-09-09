import { grantAccess, allowIfLoggedin } from '../controllers/permission';
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

router.post('/uploadFile', allowIfLoggedin, upload, insertFile);
router.get('/', allowIfLoggedin, grantAccess('readOwn', 'File'), getAllFile);
router.delete('/deleteFile', allowIfLoggedin, grantAccess('deleteAny', 'File'), deleteFile);
router.get('/downloadFile', downloadFile);

export default router;