import {Router} from 'express';
import {login, register, logout, profile, verifyToken, registerEmployee} from '../controllers/v1/auth.controller.js';
import {auth} from '../middlewares/validateToken.js';

const appUser = Router();

appUser.post('/register', register);

appUser.post('/registerEmp', registerEmployee);

appUser.post('/login', login);

appUser.post('/logout', logout);

appUser.get('/profile', auth, profile);

appUser.get('/verify', verifyToken);

export default appUser;