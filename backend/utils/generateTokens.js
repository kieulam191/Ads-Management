import jwt from "jsonwebtoken";
import  * as usertoken from "../models/usertoken.model.js";

const generateTokens = async (username,password) => {
    try {
        const payload = { username: username, password:password };
        const access = process.env.ACCESS_TOKEN_PRIVATE_KEY ||'REFRESH_TOKEN_PRIVATE_KEY';
        const refresh = process.env.REFRESH_TOKEN_PRIVATE_KEY || 'REFRESH_TOKEN_PRIVATE_KEY';
        const accessToken = jwt.sign(
            payload,
            access,
            { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
            payload,
            refresh,
            { expiresIn: "30d" }
        );
        const usertokenChk = await usertoken.findOne(username);
        if (usertokenChk) 
            await usertoken.remove(username);
        await usertoken.save(username,refreshToken);
        //await new usertoken({ username:username, refreshToken: refreshToken }).save();
        
        //return {accessToken:accessToken , refreshToken:refreshToken};
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        // return Promise.reject(err);
        //return null;
        return Promise.reject(err);
    }
};

export default generateTokens;