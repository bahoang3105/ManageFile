import { Router } from 'express'
import { signup, login } from '../controllers/authController';

const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

export default router;