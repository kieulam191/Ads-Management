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

export async function getActiveAccount(id) {
    const account =  await db('users').where('user_id', id).select('is_active', 'role_type');
    if(account.length === 0) {
        return null;
    }
    return account[0];
}

export async function activeAccount(id) {
    return await db(TABLE).where({user_id: id}).update({is_active: true});
}

