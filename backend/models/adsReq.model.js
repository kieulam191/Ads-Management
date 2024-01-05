import db from '../db/db.js'
const TABLE = "ads_req"
export async function insert(data) {
    const result =  await db(TABLE).insert(data);

    if(result.length === 0) {
        return null;
    }

    return result[0];
}



