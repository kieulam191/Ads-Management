import db from '../db/db.js'

const TABLE = 'users';

export function findAll(){
    return db(TABLE);
}

export async function findByEmail(email) {
    const user = await db(TABLE).where({ username: email});
    if (user.length === 0) {
        return null
    }
    return user[0];
}

export async function insert(email, password, role_type) {
    return await db(TABLE).insert({
        username: email,
        password: password,
        role_type: role_type,
    });
}


