import db from '../db/db.js'
import knex from "knex";
const TABLE = 'advertising_placement';

export async function  findAll(wards,districts_fullname){
    let temp = db(TABLE)
    .leftJoin("positiontype", function(){
        this
        .on("positiontype.id","advertising_placement.positiontype_id")  // Loại vị trí
        .onVal("positiontype.is_delete",false)

    })
    .leftJoin("adstype",function ()   //Hình thức quảng cáo
    {
        this
        .on("adstype.id","advertising_placement.adstype_id")
        .onVal("adstype.is_delete",false)   
    })
    .leftJoin("reportviolations",function ()   //Hình thức báo cáo
    {
        this
        .on("reportviolations.advertising_placement_id","advertising_placement.id")
        .onVal("reportviolations.is_delete",false)   
    })
    if(districts_fullname && wards)
    {
        temp.whereLike("advertising_placement.district_fullname" ,'%' + districts_fullname + '%')
        temp.andWhere(function(){
            for (var i = 0; i < wards.length; i++) {
                this.orWhereLike("advertising_placement.ward_fullname",'%' + wards[i] + '%')
            }
        })
        
    }
    else if(districts_fullname)
    {
        temp.whereLike("advertising_placement.district_fullname" ,'%' + districts_fullname + '%')
    }
    temp.where("advertising_placement.is_delete", false)
    
    return await temp.select({id : "advertising_placement.id",
    address : "advertising_placement.address" ,
    positiontype_name : "positiontype.name",
    advertising_methods_name : "adstype.name",
    planned:"advertising_placement.is_planned",
    lng:"advertising_placement.lng",
    lat:"advertising_placement.lat",
    wards_fullname:"advertising_placement.ward_fullname",
    districts_fullname:"advertising_placement.district_fullname",
    provinces_fullname:"advertising_placement.province_fullname",
    url : "advertising_placement.url"
    })

}

export async function  add(data){
    return await db(TABLE).insert(data);
    // .join("adstype", "adstype.id",TABLE.)
    //.select("id","address","area","planned","lng","lat","wards_fullname","districts_fullname","provinces_fullname","is_planning","image_url");;
}

export async function  findById(id){
    let temp = db(TABLE)
    .leftJoin("positiontype", function(){
        this
        .on("positiontype.id","advertising_placement.positiontype_id")  // Loại vị trí
        .onVal("positiontype.is_delete",false)

    })
    .leftJoin("adstype",function ()   //Hình thức quảng cáo
    {
        this
        .on("adstype.id","advertising_placement.adstype_id")
        .onVal("adstype.is_delete",false)   
    })
    .leftJoin("reportviolations",function ()   //Hình thức báo cáo
    {
        this
        .on("reportviolations.advertising_placement_id","advertising_placement.id")
        .onVal("reportviolations.is_delete",false)   
    })
    temp.where("advertising_placement.is_delete", false)
    temp.andWhere("advertising_placement.id",id)
    temp.first()
    return await temp.select({id : "advertising_placement.id",
    address : "advertising_placement.address" ,
    positiontype_name : "positiontype.name",
    advertising_methods_name : "adstype.name",
    planned:"advertising_placement.is_planned",
    lng:"advertising_placement.lng",
    lat:"advertising_placement.lat",
    wards_fullname:"advertising_placement.ward_fullname",
    districts_fullname:"advertising_placement.district_fullname",
    provinces_fullname:"advertising_placement.province_fullname",
    url : "advertising_placement.url"
    })

}


//update thông tin quảng cáo 
//sau khi sở văn hóa chấp nhận sự thay đổi quảng cáo được gửi lên
export async function updateAfterApprove(data) {
    const result = await db(TABLE).where({
        location_id: data.ad_id
    }).update({
        address: data.address,
        advertising_type: data.ad_table_type,
        advertising_method: data.ad_type
    });

    return result;
}

export async function update(id,data) {
    const result = await db(TABLE).where({
        id: id
    }).update(data);

    return result;
}
