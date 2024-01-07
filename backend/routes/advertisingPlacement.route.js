import express from 'express';
import * as advertisingPlacementModel from '../models/advertisingPlacement.model.js'
import imgMdw from '../middlewares/img.mds.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const address = req.query.search;
    const result = await advertisinglocationsModel.findByAddress(address);

    if(result === null) {
        return res.status(204).end();
    }

    return res.status(200).json(result[0]);
})


//Lấy ảnh của điểm đặt quảng cáo
router.get('/images/:id', async (req, res) => {
    const id = +req.params.id || 0;

    const result = await advertisingPlacementModel.findUrlById(id);

    if(result === null) {
        return res.status(204).end();
    }

    return res.status(200).sendFile(result.url);
})

router.post('/', async (req, res) => {
    try{
    let wards = req.body.wards;
    let districts_fullname = req.body.districts_fullname;
    const data = await advertisingPlacementModel.findAll(wards,districts_fullname);

    return res.status(200).json(data);
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/add', async (req, res) => {
    try{
        const data = await advertisinglocationsModel.add(req.body);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/id', async (req,res) => {
    try{
        let id = req.body.id || 0;
        const data = await advertisingPlacementModel.findById(id);
        return res.status(200).json(data);
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

router.post('/update', async (req,res) => {
    try{
        let id = req.body.id || 0;
        let data = req.body.data || {};
        await advertisingPlacementModel.update(id,data);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post("/upload/images",imgMdw.single("image"), async (req, res) => {

    return res.status(201).json({
        msg: "upload file successfuly"
    })
})


export default router;