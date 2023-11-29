import db from '../db/db.js'

const TABLE = 'areas';

export async function insert (ward, district, user_id, timestamp) {
    await db(TABLE).insert({
        ward: ward,
        district: district,
        user_id: user_id,
        timestamp: timestamp
    })
}