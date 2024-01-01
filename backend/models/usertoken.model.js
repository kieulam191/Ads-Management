import db from '../db/db.js';

const TABLE_NAME = 'usertoken';

export async function findOne(username) {

    const usertoken = await db(TABLE_NAME).where({ username: username});
    if (usertoken.length === 0) {
        return null
    }
    return usertoken[0];
}

export async function findByToken(refreshToken) {

    const usertoken = await db(TABLE_NAME).where({ token: refreshToken });
    if (usertoken.length === 0) {
        return null
    }
    return usertoken[0];
}

export async function remove(username) {
    return db(TABLE_NAME).where({ username: username }).del();
}

export async function removeToken(token) {
    return db(TABLE_NAME).where({ token: token }).del();
}

export async function save(username,refreshToken)
{
    return db(TABLE_NAME).insert({
        username: username,
        token: refreshToken
    });
}