import db from '../db/db.js'

const TABLE = 'advertising_board'

export async function findAll(page) {
    return await db(TABLE)
                .where("is_delete", "<>", true)
                .select();
}

export async function findByAdPlaId(id) {
    return await db(TABLE)
                .leftJoin("adstabletype", function(){
                    this
                    .on("adstabletype.id","advertising_board.adstabletype_id")  // Loại vị trí
                    .onVal("adstabletype.is_delete",false)

                })
                .leftJoin("ads_company",function ()   //Hình thức quảng cáo
                {
                    this
                    .on("ads_company.id","advertising_board.ads_company_id")
                    .onVal("ads_company.is_delete",false)   
                })
                .where("advertising_board.is_delete", false)
                .andWhere("advertising_board.advertising_placement_id", id)
                .select({id : "advertising_board.id",
                adstabletype_name : "adstabletype.name",
                height : "advertising_board.height",
                width : "advertising_board.width",
                url : "advertising_board.url",
                start_date : "advertising_board.start_date",
                end_date : "advertising_board.end_date",
                ads_company_id : "ads_company.id"
                });
                
}

//update thông tin quảng cáo 
//sau khi sở văn hóa chấp nhận sự thay đổi quảng cáo được gửi lên
export async function updateAfterApprove(data) {
    const result = await db(TABLE).where({
        id: data.ad_id
    }).update({
        height: data.height,
        width: data.width,
        adstabletype_id: data.ad_table_type
    });

    return result;
}
