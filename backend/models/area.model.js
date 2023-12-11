import db from '../db/db.js'

const TABLE = 'areas';
const LIMIT = 10;


export async function insert(
                    province_code, 
                    district_code, 
                    ward_code,
                    user_id,
                    timestamp, 
                    old_id = null) {


    await db(TABLE).insert({
        province_code: province_code,
        district_code: district_code, 
        ward_code: ward_code, 
        user_id: user_id,
        timestamp: timestamp,
        old_id: old_id,
    });
}

export async function findAll(page) {
    const areas = await db(TABLE)
        .where("areas.states", "<>", "old")
        .where("areas.is_delete", "<>", true)
        .select("area_id")
        .offset((page - 1) * LIMIT)
        .limit(LIMIT)
        .then(async (rows) => await Promise.all(
            rows.map(async (col) => { 
            const area = await findAreaByAreaId(col.area_id) 
            return area[0];
        })));
    
    return areas
}

export async function findAreaByAreaId(area_id) {
    const area_user = await db(TABLE)
        .leftJoin("provinces", "areas.province_code", "=", "provinces.code")
        .leftJoin("wards", "areas.ward_code", "=", "wards.code")
        .leftJoin("districts", "areas.district_code", "=", "districts.code")
        .leftJoin("users", "areas.user_id", "=", "users.user_id")
        .where("area_id", "=", area_id)
        .select(
            "areas.area_id",
            "areas.province_code",
            "areas.district_code",
            "areas.ward_code",
            "areas.user_id",
            "provinces.full_name as province_name", 
            "districts.full_name as district_name", 
            "wards.full_name as ward_name",
            "users.username"
        )
    
    return area_user;
}


export async function update(id, timestamp_new, newWard) {

    console.log(id);
    console.log(timestamp_new);
    console.log(newWard);

    const result = await db(TABLE)
        .where({area_id: id})
        .where("areas.is_delete", "<>", true)
        .where("areas.states", "=", "new")
        .select("*")
        .then((async area => {
            console.log(area);
            if(area.length === 0) {
                return null;
            }

            const {timestamp, is_delete, old_id, states, ...rest} = area;
        
            await db(TABLE).update({
                states: 'old'
            }).where({area_id: area[0].area_id});
            console.log("ket thuc update");

           return await insert(rest[0].province_code, rest[0].district_code, newWard, rest[0].user_id, timestamp_new, rest[0].area_id);
        }));

        return result;
}

export async function remove(id) {
    return await db(TABLE)
    .where("area_id", "=", id)
    .where("areas.is_delete", "=", false)
    .where("areas.states", "=", "new")
    .update({
        is_delete: true,
    })
}

function getJsonKey(json) {
    var key = Object.keys(json);

    return  key;
}

export async function search(con, page) {
    const query = {
        ward:'LOWER(wards.full_name) LIKE ?', 
        district: 'LOWER(districts.full_name) LIKE ?',
        email: 'LOWER(users.username) LIKE ?'
    };


    const key = getJsonKey(con[0]);
    let values = [`%${con[0][key].trim().toLowerCase()}%`];
    let whereCondition = query[key]

    for(let i =1; i < con.length; ++i) {
        const key = getJsonKey(con[i]);
       whereCondition = whereCondition.concat(` AND ${query[key]} `);
       values.push(`%${con[i][key].trim().toLowerCase()}%`)
    }

   const result =  await db(TABLE)
   .leftJoin("wards", "areas.ward_code", "=", "wards.code")
   .leftJoin("districts", "areas.district_code", "=", "districts.code")
   .leftJoin("users", "areas.user_id", "=", "users.user_id")
   .where("areas.is_delete", "=", false)
   .where("areas.states", "=", "new")
   .whereRaw(whereCondition, values)
   .select(
        "areas.area_id", 
        "districts.full_name as district_name", 
        "wards.full_name as ward_name",
        "users.username"
    )
    .offset((page - 1) * LIMIT)
    .limit(LIMIT)

  return result;
}

