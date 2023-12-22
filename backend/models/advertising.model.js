import db from '../db/db.js'

const TABLE = 'advertisingboards'
const LIMIT = 10;

export async function findAll(page) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .where("is_valid", "=", true)
                .select("board_id", "location_id", "board_type", "size", "is_valid", "is_verified")
                .offset((page - 1) * LIMIT)
                .limit(LIMIT);
}

export async function findById(id) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .where("is_valid", "=", true)
                .where("board_id", "=", id)
                .select("board_id", "location_id", "board_type", "size", "is_valid", "is_verified")
                
}

export async function insert(data) {
    const result = await db(TABLE).insert(data);

    if(result.length === 0) {
        return null;
    }

    return result[0];
}

export async function update(id ,data) {
    const result = await db(TABLE)
    .where("is_delete", "<>", true)
    .where("board_id", "=", id)
    .update(data);

    if(result === 0) {
        return null;
    }

    return result;
}

export async function remove(id) {
    const result = await db(TABLE)
    .where("is_delete", "<>", true)
    .where("is_valid", "=", true)
    .where({board_id: id})
    .update({is_delete: true});

    if(result === 0) {
        return null;
    }

    return result;
}

export async function getAdsLocationApprovals() {
    return await db(TABLE).where({
        is_verified: -1
    })
    .where("is_valid", "=", true)
    .where("is_delete", "<>", true).select("board_id", "location_id", "board_type", "size")
}