import { Router } from "express";
import * as accountModel  from '../models/account.model.js';
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import {verifyRefreshToken, deleteRefreshToken} from "../utils/verifyRefreshToken.js";
import jwt from "jsonwebtoken";
// import {
//     signUpBodyValidation,
//     logInBodyValidation,
// } from "../utils/validationSchema.js";

const router = Router();

// signup
router.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const role_type =+ req.body.role_type || 1;
        const account = await accountModel.findByEmail(username);
        if (account)
            return res
                .status(400)
                .json({ error: true, message: "Username already exist" });

        const salt = await bcrypt.genSalt(Number(5));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        await accountModel.insert(username, hashPassword, role_type);
        //mailUtil.sendMail(email, hashPassword); 
        res.json({
            error:false,
            message: "Account created successfully."
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: true, message: "Error SignUp" });
    }
});

// login
router.post("/signin", async (req, res) => {
    try {
        const user = await accountModel.findByUser(req.body.username);
        if (!user)
            return res
                .status(400)
                .json({ error: true, message: "Username not exist" });

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifiedPassword)
            return res
                .status(400)
                .json({ error: true, message: "Invalid username or password" });
        const { accessToken, refreshToken } = await generateTokens(user.username,user.password);
        res.json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: true, message: "Error login" });
    }
});

router.post("/refreshtoken", async (req, res) => {
    try{
    const {username,password}  = await verifyRefreshToken( req.body.refreshToken );
    const payload = { username : username , password:password};
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY || 'ACCESS_TOKEN_PRIVATE_KEY',
                { expiresIn: "1d" }
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        // })
    }
    catch(err)
    {
        res.status(400).json({ error: true, message: err.message});
    };
});

router.post("/deleterefreshtoken", async (req, res) => {
    try {
        await deleteRefreshToken (req.body.refreshToken );
        res.status(200).json({ error: false, message: "Token is deleted" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: true, message: err.message });
    }
});

export default router;