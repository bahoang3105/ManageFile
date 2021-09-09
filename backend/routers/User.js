import { Router } from 'express'
import { signup, login, hasLogged } from '../controllers/authController';
import { allowIfLoggedin } from '../controllers/permission';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/checkLogin', allowIfLoggedin, hasLogged);

export default router;