import { Router } from 'express'
import {
    getAllUser, 
    deleteUser, 
    resetPassUser, 
    upgradeToAdmin 
} from '../controllers/userManage';
import { grantAccess, allowIfLoggedin } from '../controllers/permission';
import { getAllFile } from '../controllers/handleFiles';

const router = Router();

router.get('/file', allowIfLoggedin, grantAccess('readAny', 'File'), getAllFile);
router.get('/user', allowIfLoggedin, grantAccess('readAny', 'User'), getAllUser);
router.delete('/user/delete', allowIfLoggedin, grantAccess('deleteAny', 'User'), deleteUser);
router.post('/user/resetPassword', allowIfLoggedin, grantAccess('updateAny', 'User'), resetPassUser);
router.post('/user/upgrade', allowIfLoggedin, grantAccess('updateAny', 'User'), upgradeToAdmin);

export default router;