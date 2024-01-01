import db from '../db/db.js'
import knex from "knex";
const TABLE = 'advertisinglocations';

export async function  findAll(wards,districts_fullname){
    let temp = db(TABLE).leftJoin("adstabletype",function(){
        this
        .on("adstabletype.id" , "advertisinglocations.advertising_type") // loại bảng quảng cáo
        .onVal("adstabletype.is_delete", 'false')
    }) 
    .leftJoin("positiontype", function(){
        this
        .on("positiontype.id","advertisinglocations.location_type")  // Loại vị trí
        .onVal("positiontype.is_delete",false)

    })
    .leftJoin("advertising_methods",function ()   //Hình thức quảng cáo
    {
        this
        .on("advertising_methods.id","advertisinglocations.advertising_method")
        .onVal("advertising_methods.is_delete",false)   
    })
    //"adstabletype.id", "=" , "advertisinglocations.advertising_type")
    //.select();
    // return await db(TABLE)
    // .where("is_delete", false)
    // // .join("adstype", "adstype.id",TABLE.)
    // //.select("location_id","address","area","planned","lng","lat","wards_fullname","districts_fullname","provinces_fullname","is_planning","image_url");
    // .select();
    if(districts_fullname && wards)
    {
        // temp.andWhereLike({"districts_fullname":'%' + districts_fullname + '%',"wards_fullname" : '%' + wards[i] + '%'})
        // temp.orWhereLike("wards_fullname" , '%' + wards[i] + '%')
        //Do something
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
    // else if(wards)
    // {
    //     // var myStringArray = ["Hello","World"];
    //     // var arrayLength = myStringArray.length;
    //     for (var i = 0; i < wards.length; i++) {
    //         temp.whereLike("wards_fullname" , '%' + wards[i] + '%')
    //         //Do something
    //     }
    //     //temp.whereIn("wards_fullname" , wards)
    // }
    temp.where("advertisinglocations.is_delete", false)
    
    return await temp.select({location_id : "location_id",
    address : "address" ,
    adstabletype_name : "adstabletype.name",
    positiontype_name : "positiontype.name",
    advertising_methods_name : "advertising_methods.name",
    planned:"planned",
    lng:"lng",
    lat:"lat",
    wards_fullname:"wards_fullname",
    districts_fullname:"districts_fullname",
    provinces_fullname:"provinces_fullname",
    is_planning:"is_planning",
    expried:"expried",
    width: "width" ,
    height:"height"
    })

}

export async function  add(data){
    return await db(TABLE).insert(data);
    // .join("adstype", "adstype.id",TABLE.)
    //.select("location_id","address","area","planned","lng","lat","wards_fullname","districts_fullname","provinces_fullname","is_planning","image_url");;
}

export async function  findById(id){
    return await db(TABLE)
    .leftJoin("adstabletype",function(){
        this
        .on("adstabletype.id" , "advertisinglocations.advertising_type") // loại bảng quảng cáo
        .onVal("adstabletype.is_delete", 'false')
    }) 
    .leftJoin("positiontype", function(){
        this
        .on("positiontype.id","advertisinglocations.location_type") // Loại vị trí
        .onVal("positiontype.is_delete",false)

    })
    .leftJoin("advertising_methods",function ()   //Hình thức quảng cáo
    {
        this
        .on("advertising_methods.id","advertisinglocations.advertising_method")
        .onVal("advertising_methods.is_delete",false)   
    })
    .where("location_id",id)
    .andWhere("advertisinglocations.is_delete", false)
    .first()
    .select({location_id : "location_id",
    address : "address" ,
    adstabletype_name : "adstabletype.name",
    positiontype_name : "positiontype.name",
    advertising_methods_name : "advertising_methods.name",
    planned:"planned",
    lng:"lng",
    lat:"lat",
    wards_fullname:"wards_fullname",
    districts_fullname:"districts_fullname",
    provinces_fullname:"provinces_fullname",
    is_planning:"is_planning",
    expried:"expried",
    width: "width" ,
    height:"height"
    })

}
