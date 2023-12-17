import { json } from "express";
import * as UserToken from "../models/usertoken.model.js";
import jwt from "jsonwebtoken";

export const verifyRefreshToken = async (refreshToken) => {
    try{
        const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY || 'REFRESH_TOKEN_PRIVATE_KEY';
        const userToken = await UserToken.findByToken(refreshToken);
        
        if(userToken == null)
        {
            return Promise.reject({ error: true, message: "Invalid refresh token" });
        }
        var user = jwt.verify(refreshToken, privateKey);
        if(user)
            return Promise.resolve({username:user.username,password:user.password});
        else
            return Promise.reject({error:true, message: "Invalid refresh token"});
    }catch(err) {
        return Promise.reject(err);
    }
};

export const  deleteRefreshToken = async (refreshToken) => {
    try{
        const userToken = await UserToken.removeToken(refreshToken);
    }catch(err) {
        return Promise.reject(err);
    }
};


