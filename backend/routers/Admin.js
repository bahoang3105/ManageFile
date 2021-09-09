import { Router } from 'express'
import { loginAdmin } from '../controllers/authController';
import {
    getAllUser, 
    deleteUser, 
    resetPassUser, 
    upgradeToAdmin 
} from '../controllers/userManage';

const router = Router();


router.route('/login').post(loginAdmin);

router.route('/user').get(getAllUser);
router.route('/user/delete').delete(deleteUser);
router.route('/user/resetPassword').post(resetPassUser);
router.route('/user/upgrade').post(upgradeToAdmin);

export default router;