import express from 'express';
import * as areaModel from '../models/area.model.js';
import * as timestamp from '../utils/timestampUtil.js';


const router = express.Router();

router.get('/', async (req, res) => {
    /*
        #swagger.description = 'Lấy danh sách khu vực quản lý user'
     */ 
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await areaModel.findAll(page);

    res.status(200).json({
        data,
    });
});

router.get('/assigns/:user_id/districts', async (req, res) => {
     /*
        #swagger.description = 'Lấy thông tin quận mà user quản lý'
     */ 
    const user_id = req.params.user_id;

    const district = await areaModel.findDistrictByUserId(user_id);

    if(district === null) {
        return res.status(204).end();
    }

    return res.status(200).json({
        data: district
    })
});

router.get('/assigns/:user_id/wards', async (req, res) => {
      /*
        #swagger.description = 'Lấy thông tin phường mà user quản lý'
     */ 
    const user_id = req.params.user_id;

    const wards = await areaModel.findWardsByUserId(user_id);

    if(wards === null) {
        return res.status(204).end();
    }

    return res.status(200).json({
        data: wards
    })
});

router.get('/search', async (req, res) => {
      /*
        #swagger.description = 'Tìm kiếm thông tin về quận và phường'
     */ 
    const {ward, district, email} = req.query;
    const con = [];

    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    if(ward !== undefined) {
        con.push({ward});
    }

    if(district !== undefined) {
        con.push({district});
    } 

    if(email !== undefined) {
        con.push({email});
    } 

   const data = await areaModel.search(con, page);

   return res.status(200).json(data);
})


router.patch('/:id/wards', async (req, res) => {
     /*
        #swagger.description = 'Thay đổi phường dựa vào area_id'
     */ 
    const newWard = req.body.newWard;
    const id = +req.params.id ?? 0
    const ts = timestamp.getTS();


    const result = await areaModel.update(id, ts,newWard);

    if(result === null) {
        return res.status(400).json({
            msg: "update failure"
        })
    }

    return res.status(200).json({
        msg: "update successfuly new ward"
    })
})

router.delete('/:id', async (req, res) => {
    /*
        #swagger.description = 'xóa một khu vực dựa vào id'
     */ 
    const id  = +req.params.id || 0;

    await areaModel.remove(id);
   
    return res.status(204).end();
})

export default router;