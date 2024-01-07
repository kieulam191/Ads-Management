import express from 'express';
import generator from 'generate-password';
import  'node-localstorage/LocalStorage.js';
import 'dotenv/config';
import * as mailUtil from '../utils/mailUtil.js';
import * as accountMdw from "../middlewares/account.mdw.js";
import * as accountModel  from '../models/account.model.js';
import * as areaModel from "../models/area.model.js"
import areaValidate from "../middlewares/area.mdw.js";
import * as ts from "../utils/timestampUtil.js"
import { LocalStorage } from 'node-localstorage/LocalStorage.js';
import * as hashUtil from "../utils/hashUtil.js"


const router = express.Router();
const OTP_MIN_LIMIX = 1;
let  localStorage;


router.get('/', async (req, res) => {
    /*
        #swagger.description = 'Lấy danh sách tài khoản'
    */ 
    const data = await accountModel.findAll();
    return res.status(200).json(
        {accounts: data}
    )
})

router.post('/', accountMdw.checkAcccountValid, accountMdw.checkAccountExists, async (req, res) => {
    const email = req.body.email;
    const role_type = +req.body.role_type || 1;

    const gen_password = generator.generate({
        length: process.env.PASSWORD_LENGTH || 16,
        uppercase: true,    
        lowercase: true,
        numbers: true,
    })
   
    const salt = await bcrypt.genSalt(Number(5));
    const hashPassword = await bcrypt.hash(gen_password, salt);

    await accountModel.insert(email, hashPassword, role_type);   
    mailUtil.sendMail(email, gen_password); 

    res.status(201).json({
        msg: "Account created successfully."
    });
});

router.get("/:id/actives", async (req, res) => {
    const id = +req.params.id || 0;

    const state = await accountModel.getActiveAccount(id);
    if(state === null) {
        return res.status(204).end;
    }

    const officer_type = (state["role_type"] === 1 ? 'Ward Officer' :  'District Officer');
    const msg = (state["is_active"] === true 
        ? "The account has been activated." 
        : "The account is not yet activated. Please choose the ward information you need to manage."
    );

    res.status(200).json({
        data: state,
        type: officer_type,
        msg: msg
    })
})

router.post("/:id/assignments/:role_type", areaValidate, async (req, res) => {
   const user_id = +req.params.id || 0;
   const {province_code, district_code, wards}= req.body;

    const timestamp = ts.getTS();

    wards.forEach(ward => {
        areaModel.insert(province_code, district_code, ward, user_id, timestamp);
    });
    
    // wards.map((async(ward) => await areaModel.insert(province_code, district_code, ward, user_id, timestamp)));
   
   await accountModel.activeAccount(user_id);

   res.status(201).json({msg: "assign area successfuly"});
});

router.post('/forgot-password', accountMdw.checkEmailValid, async (req, res) => {
    const email = req.body.email;

    const otp_code = generator.generate({
        length: 6,
        uppercase: false,    
        lowercase: false,
        numbers: true,
    })
    localStorage = new LocalStorage("./storage")
    console.log(otp_code);

    const hash = await hashUtil.hash(otp_code);
    localStorage.setItem(email, hash);

    mailUtil.sendOTPMail(email, otp_code);

    ts.start();
    setTimeout(() => {
        ts.stop()
        localStorage.removeItem(email);
    }, OTP_MIN_LIMIX * 60 * 1000)

    return res.status(200).json({
        msg: "send OTP code successfully"
    });

    
})

router.post('/verify-otp', accountMdw.checkOTPValid, async (req, res) => {
    const email = req.body.email;
    const otp_receive = req.body.otp;
    const min_receive = +ts.getMinute();

    if(!ts.isRunning()) {
        return res.status(410).json(
            {msg: "OTP code is no longer available."}
        );
    }

    const result = await hashUtil.compare(otp_receive, localStorage.getItem(email));

    if(!result) {
        return res.status(400).json({
            msg: "OTP code incorrect"
        })
    }

    ts.stop();
    const user = await accountModel.findByEmail(email);
    const gen_code = generator.generate({
        length: 8,
        uppercase: true,    
        lowercase: true,
        numbers: true,
    })
    await accountModel.insertCodeForResetpassword(user.user_id, gen_code)
    return res.status(200).json({
        code: gen_code,
        msg: "OTP code successfully"
    })
})

router.patch('/reset-password/:reset_code', accountMdw.checkPasswordValid, async (req, res) => {
    const { new_password } = req.body;
    const code = req.params.reset_code;
    
    
    const result = await accountModel.findUserId(code);

    if(result === null) {
        return res.status(404).json({
            msg: 'access invalid'
        })
    }
    const id = +result.user_id || 0;
    const pass_hash = await hashUtil.hash(new_password);
    const data = await accountModel.resetPassword(id, pass_hash);
    
    await accountModel.removeEmailVerifyCode(id);

    if(data === null) {
        return res.status(400).json({
            msg: 'reset password failure'
        })
    }

    return res.status(200).json({
        msg: 'reset password successfully'
    })
})

router.patch('/:id/profiles', async (req, res) => {
    const id = +req.params.id || 0;
    const data = accountModel.updateProfile(id, req.body);

    if(data === null) {
        return res.status(400).json({
            msg: 'update profile faluire'
        });
    }

    return res.status(200).json({
        msg: 'update profile successfully'
    })
})

export default router;