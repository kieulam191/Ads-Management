import db from '../db/db.js'

const TABLE = 'users';

export async function  findAll(){
    return await db(TABLE)
    .where("is_delete", "<>", true)
    .select("user_id", "username", "fullname", "birthday", "email", "phone_number");
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

export async function resetPassword(id, new_password) {
    const result = await db(TABLE).where( {
        user_id: id
    }).update({password: new_password});

    if(result === 0) {
        return null;
    }

    return result;
}

export async function updateProfile(id, data) {
    const result = await db(TABLE).where( {
        user_id: id
    }).update(data);

    if(result === 0) {
        return null;
    }

    return result;
}
export async function findByUser(username) {
    const user = await db(TABLE).where({ username: username});
    if (user.length === 0) {
        return null
    }
    return user[0];
}
