import db from '../db/db.js'

const TABLE = 'districts';
const LIMIT = 10;

export async function findAll() {
    const getModel = await db(TABLE)
        //.where("areas.states", "<>", "old")
        .where("districts.is_deleted", "<>", true);
        //.select("area_id")
        // .offset((page - 1) * LIMIT)
        // .limit(LIMIT);
    
    return provinces;
}

export async function getByProvince(provinceCode,page) {
    const getModel = db(TABLE)
        .where("districts.province_code", "=", provinceCode)
        .where("districts.is_deleted", "<>", true);
        //.select("code");
        // .offset((page - 1) * LIMIT)
        // .limit(LIMIT);
    let totalCount = await getModel.clone().count();
    let data;
    if(page = 0)
        data = await getModel.clone().offset((page - 1) * LIMIT).limit(LIMIT).select("code","full_name");
    else
        data = await getModel.clone().select("code","full_name");
    return {
        totalCount: totalCount[0]['count'],
        data: data
    };
    return getModel;
}