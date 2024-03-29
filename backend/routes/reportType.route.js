import express from 'express';
import * as reportModel from '../models/reportType.model.js'

const router =express.Router();

router.get('/', async (req, res) => {
     /*
        #swagger.description = 'Lấy tất cả loại báo cáo'
     */
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await reportModel.findAll(page);

    return res.status(200).json({data});
});

router.get('/:id', async (req, res) => {
      /*
        #swagger.description = 'Lấy loại báo cáo dựa vào id'
     */
    const id = +req.params.id || 0;
    const data = await reportModel.findById(id);

    if(data.length === 0) {
        return res.status(204).end();
    }

    return res.status(200).json({data});
})

router.post('/', async (req, res) => {
      /*
        #swagger.description = 'Thêm mới loại báo cáo'
     */
    const name = req.body.name;

    const result = await reportModel.insert(name);

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
        #swagger.description = 'Thay đổi mới loại báo cáo dựa vào id'
     */
    const id = +req.params.id || 0;
    const { name } = req.body;

    const result = await reportModel.update(id ,name);

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
        #swagger.description = 'Xóa loại báo cáo dựa vào id'
     */
    const id = +req.params.id || 0;

    const result = await reportModel.remove(id);

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