import db from '../db/db.js'

export async function  findAll(wards,districts_fullname){
    let temp = db('reportviolations').leftJoin("reporttype",function(){
        this
        .on("reporttype.id" , "reportviolations.report_type_id") // loại bảng quảng cáo
        .onVal("reporttype.is_delete", 'false')
    }) 
    if(districts_fullname && wards)
    {
        temp.whereLike("districts_fullname" ,'%' + districts_fullname + '%')
        temp.andWhere(function(){
            for (var i = 0; i < wards.length; i++) {
                this.orWhereLike("wards_fullname",'%' + wards[i] + '%')
            }
        })
        
    }
    else if(districts_fullname)
    {
        temp.whereLike("districts_fullname" ,'%' + districts_fullname + '%')
    }
    temp.where("reportviolations.is_delete", false)
    // return await temp.select();
    return await temp.select({id : "reportviolations.id",
    reporttype_name : "reporttype.name",
    fullname : "fullname",
    email : "email",
    phone_number:"phone_number",
    lng:"lng",
    lat:"lat",
    wards_fullname:"wards_fullname",
    districts_fullname:"districts_fullname",
    provinces_fullname:"provinces_fullname",
    processed:"processed",
    created:"created",
    })

}

export async function  update(id,data){
    return await db('reportviolations').where('id',id).update(data);
}

export async function  add(data){
    return await db('reportviolations').insert(data);
    // .join("adstype", "adstype.id",TABLE.)
    //.select("location_id","address","area","planned","lng","lat","wards_fullname","districts_fullname","provinces_fullname","is_planning","image_url");;
}

export async function  findById(id){
    return db('reportviolations')
    .leftJoin("reporttype",function() {
        this
        .on("reporttype.id" , "reportviolations.report_type_id") // loại bảng quảng cáo
        .onVal("reporttype.is_delete", 'false')
    })
    .where("reportviolations.id",id)
    .andWhere("reportviolations.is_delete", false)
    .first()
    .select({id : "reportviolations.id",
    reporttype_name : "reporttype.name",
    fullname : "fullname",
    email : "email",
    phone_number:"phone_number",
    lng:"lng",
    lat:"lat",
    wards_fullname:"wards_fullname",
    districts_fullname:"districts_fullname",
    provinces_fullname:"provinces_fullname",
    processed:"processed",
    created:"created",
    })

}


