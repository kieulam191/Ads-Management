import express from 'express';
import generator from 'generate-password';
import 'dotenv/config';
import * as mailUtil from '../utils/mailUtil.js';
import * as accountMdw from "../middlewares/account.mdw.js";
import * as accountModel  from '../models/account.model.js';


const router = express.Router();

router.post('/', accountMdw.checkAcccountValid, accountMdw.checkAccountExists, async (req, res) => {
    const email = req.body.email;
    const role_type = +req.body.role_type || 1;

    const gen_password = generator.generate({
        length: process.env.PASSWORD_LENGTH || 16,
        uppercase: true,    
        lowercase: true,
        numbers: true,
    })
   

    await accountModel.insert(email, gen_password, role_type);   
    mailUtil.sendMail(email, gen_password); 

    res.status(201).json({
        msg: "Account created successfully."
    });
});

export default router;