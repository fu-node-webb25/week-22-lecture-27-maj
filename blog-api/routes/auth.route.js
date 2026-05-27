import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { addNewUser, getUser } from '../services/users.service.js';
import { comparePasswords, hashPassword } from '../utils/bcrypt.util.js';
import { signToken } from '../utils/jwt.util.js';

const router = Router();

router.use(authenticateKey);

// POST register user
router.post('/register', async (req, res, next) => {
    const user = req.body;
    if(!user) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await addNewUser({
        userId : crypto.randomUUID().substring(0, 5),
        username : user.username,
        password : await hashPassword(user.password)
    });

    if(result.success) {
        res.status(201).json({
            success : true,
            message : 'User registered successfully',
            user : result.user
        });
    } else {
        next({
            status : 400,
            message : result.message
        });
    }
});

// POST login user
router.post('/login', async (req, res, next) => {
    const user = req.body;
    if(!user) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await getUser(user.username);
    if(result.success) {
        if(await comparePasswords(user.password, result.user.password)) {
            const token = signToken({
                userId : result.user.userId,
                username : result.user.username,
                role : 'User'
            });
            
            res.json({
                success : true,
                message : 'User logged in successfully',
                token
            });
        } else {
            next({
                status : 401,
                message : 'Invalid password'
            });
        }
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

export default router;