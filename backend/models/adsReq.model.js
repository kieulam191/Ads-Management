import db from '../db/db.js'
const TABLE = "ads_req"
export async function insert(data) {
    const result =  await db(TABLE).insert(data);

    if(result.length === 0) {
        return null;
    }

    return result[0];
}

export async function findById(id) {
    const result = await db(TABLE).where({id: id});
    return result[0];
}

export async function findByStatus(status) {
    const result = await db(TABLE)
    .where("status", "=", status);

    if(result.length === 0) {
        return null;
    }

    return result;
}

export async function findAll() {
    const result = await db(TABLE);

    return result;
}

export async function updateStatus(id, new_status) {
    const result = await db(TABLE).where({
        id: id,
        status: 0
    }).update({status: new_status});

    if(result === 0) {
        return null;
    }
   return result;
}


