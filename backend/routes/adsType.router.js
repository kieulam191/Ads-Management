import express from 'express';
import * as adsModel from '../models/adsType.model.js'

const router =express.Router();

router.get('/', async (req, res) => {
     /*
        #swagger.description = 'Lấy tất cả hình thức quảng cáo'
     */
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await adsModel.findAll(page);

    return res.status(200).json({data});
});

router.get('/:id', async (req, res) => {
     /*
        #swagger.description = 'Lấy hình thức quảng cáo dựa vào id'
     */
    const id = +req.params.id || 0;
    const data = await adsModel.findById(id);

    if(data.length === 0) {
        return res.status(204).end();
    }

    return res.status(200).json({data});
})

router.post('/', async (req, res) => {
     /*
        #swagger.description = 'Thêm hình thức quảng cáo'
     */
    const name = req.body.name;

    const result = await adsModel.insert(name);

    if(result === null) {
        return res.status(400).end();
    }

    return res.status(201).json({
        id: result,
        name: name,
        msg:"created successfully"
    });
}) 

router.patch('/:id', async (req, res) => {
     /*
        #swagger.description = 'Thay đổi hình thức quảng cáo dựa vào id'
     */
    const id = +req.params.id || 0;
    const {name} = req.body;

    const result = await adsModel.update(id ,name);

    if(result === null) {
        return res.status(400).json({
            msg: "update failure"
        })
    }

    return res.status(200).json({
        msg: "update successfully"
    })
})

router.delete('/:id', async (req, res) => {
     /*
        #swagger.description = 'Xóa hình thức quảng cáo dựa vào id'
     */
    const id = +req.params.id || 0;

    const result = await adsModel.remove(id);

    if(result === null) {
        return res.status(404).json({
            msg: "remove failure"
        })
    }

    return res.status(204).json({
        msg: "remove successfully"
    })
})

export default router;