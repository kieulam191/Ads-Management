import express from 'express';
import * as adsCompany from '../models/adsCompany.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let wards = req.body.wards;
        let districts_fullname = req.body.districts_fullname;
        const data = await adsCompany.findAll(wards, districts_fullname);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.stack);
        return res.status(400);
    }
});

router.post('/add', async (req, res) => {
    try{
        const data = await adsCompany.add(req.body);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

router.post('/update', async (req, res) => {
    try{
        let id = req.body.id; // Get id and data from request body
        let data = req.body.data;
        const result = await adsCompany.update(id, data);
        return res.status(200).json({ msg: "Success" });
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/delete', async (req,res) => {
    try{
        const data = await adsCompany.deleteById(req.body.id);
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
        const data = await adsCompany.findById(req.body.id);
        return res.status(200).json(data ? data : {});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

export default router;