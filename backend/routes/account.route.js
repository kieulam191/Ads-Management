import express from 'express';
import generator from 'generate-password';
import 'dotenv/config';
import * as mailUtil from '../utils/mailUtil.js';


const router = express.Router();

router.post('/', (req, res) => {
    const { email, role_type } = req.body;

    const gen_password = generator.generate({
        length: process.env.PASSWORD_LENGTH || 16,
        uppercase: true,    
        lowercase: true,
        numbers: true,
    });
    
    res.status(201).json({
       ...req.body,
        passwords: gen_password
    });
    mailUtil.sendMail(email, gen_password);
    
});

export default router;