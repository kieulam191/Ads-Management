import knex from 'knex';
import db from '../db/db.js'

const TABLE = 'userreports'
const LIMIT = 1000;

export async function findAll(page, fields) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .select(fields)
                .offset((page - 1) * LIMIT)
                .limit(LIMIT);
}

export async function findById(id, fields) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .where("id", "=", id)
                .select(fields)
                
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

export async function analysis(fields, group, time_stamp) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .where('created_at', '=', time_stamp)
                .orWhere('created_at', '<', time_stamp)
                .select(fields)
                .count(fields)
                .groupBy(group)
}