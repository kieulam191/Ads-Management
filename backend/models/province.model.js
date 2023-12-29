import db from '../db/db.js'

const TABLE = 'provinces';
const LIMIT = 10;

export async function findAll() {
    let getModel = await db(TABLE)
        //.where("areas.states", "<>", "old")
        .where("provinces.is_deleted", "<>", true)
        .select("code","full_name")
        .orderBy("code");
        //.select("area_id")
        // .offset((page - 1) * LIMIT)
        // .limit(LIMIT);
    // let totalCount = await getModel.clone().count();
    // let data = await getModel.clone();
    // return {
    //     totalCount: totalCount[0]['count'],
    //     data: data
    // };
    return getModel;
}