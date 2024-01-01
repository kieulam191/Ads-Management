import db from '../db/db.js'

const TABLE = 'adstype'
const LIMIT = 10;

export async function findAll(page) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .select("id", "name")
                .offset((page - 1) * LIMIT)
                .limit(LIMIT);
}

export async function findById(id) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .where("id", "=", id)
                .select("id", "name")
                
}

export async function insert(data) {
    const result = await db(TABLE).insert({name: data});

    if(result.length === 0) {
        return null;
    }

    return result[0];
}

export async function update(id ,data) {
    const result = await db(TABLE)
    .where("is_delete", "<>", true)
    .where("id", "=", id)
    .update({name: data});

    if(result === 0) {
        return null;
    }

    return result;
}

export async function remove(id) {
    const result = await db(TABLE)
    .where("is_delete", "<>", true)
    .where({id: id})
    .update({is_delete: true});

    if(result === 0) {
        return null;
    }

    return result;
}