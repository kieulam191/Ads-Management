import express from 'express';
import * as positionModel from '../models/position.model.js'

const router =express.Router();

router.get('/', async (req, res) => {
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await positionModel.findAll(page);

    return res.status(200).json({data});
});

router.post('/', async (req, res) => {
    const name = req.body.name;

    const result = await positionModel.insert(name);

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

    const id = +req.params.id || 0;
    const { name } = req.body;

    const result = await positionModel.update(id ,name);

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
    const id = +req.params.id || 0;

    const result = await positionModel.remove(id);

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