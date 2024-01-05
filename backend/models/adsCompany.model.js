import db from '../db/db.js'
const TABLE = 'ads_company';

export async function findAll(wards, districts_fullname) {
    let temp = db(TABLE);
    if (districts_fullname && wards) {
        temp.whereLike("ads_company.districts_fullname", '%' + districts_fullname + '%')
            .andWhere(function () {
                for (var i = 0; i < wards.length; i++) {
                    this.orWhereLike("ads_company.wards_fullname", '%' + wards[i] + '%');
                }
            });
    } else if (districts_fullname) {
        temp.whereLike("ads_company.districts_fullname", '%' + districts_fullname + '%');
    }
    temp.where("ads_company.is_delete", false);

    return await temp.select({
        id: "ads_company.id",
        location_id: "ads_company.location_id",
        lat: "ads_company.lat",
        lng: "ads_company.lng",
        description: "ads_company.description",
        image: "ads_company.image",
        email: "ads_company.email",
        phone_number: "ads_company.phone_number",
        address: "ads_company.address",
        start_contract: "ads_company.start_contract",
        end_contract: "ads_company.end_contract",
        is_verified: "ads_company.is_verified",
        wards_fullname: "ads_company.wards_fullname",
        districts_fullname: "ads_company.districts_fullname",
        provinces_fullname: "ads_company.provinces_fullname"
    });
}

export async function add(data) {
    return await db(TABLE).insert(data);
}

export async function update(id, data) {
    return await db(TABLE).where('id', id).update(data);
}



export async function deleteById(id) {
    return await db(TABLE).where('id', id).update({ is_delete: true });

}

export async function findById(id) {
    return await db(TABLE).where("id", id).andWhere("is_delete", false).first();
}
