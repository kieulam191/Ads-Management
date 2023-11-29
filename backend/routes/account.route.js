import express from 'express';
import generator from 'generate-password';
import 'dotenv/config';
import * as mailUtil from '../utils/mailUtil.js';
import * as accountMdw from "../middlewares/account.mdw.js";
import * as accountModel  from '../models/account.model.js';
import * as areaModel from "../models/area.model.js"
import areaValidate from "../middlewares/area.mdw.js";


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

router.post("/:id/assignments", areaValidate, async (req, res) => {
   const user_id = +req.params.id || 0;
   const assignment= req.body;

   const timestamp = Date.now();
   const district = assignment["district"];
   assignment['data'].map(ward => areaModel.insert(ward, district, user_id, timestamp));
   
   await accountModel.activeAccount(user_id);

   res.status(201).json({msg: "assign area successfuly"});
});

export default router;