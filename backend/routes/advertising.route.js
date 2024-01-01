import express from 'express';
import * as advertisingModel from '../models/advertising.model.js'
import * as adsDetailModel from '../models/adsDetail.model.js'
import {
    ADVERTISE_ACTION,
    VERIFY_STATE,
} from '../config/constance.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await advertisingModel.findAll(page);

    return res.status(200).json({data});
});

router.get('/approvals', async(req, res) => {
    const data = await advertisingModel.getAdsLocationApprovals();

    return res.status(200).json({data});
})

router.get('/:id', async (req, res) => {
    const id = +req.params.id || 0;
    const data = await advertisingModel.findById(id);

    if(data.length === 0) {
        return res.status(204).end();
    }

    return res.status(200).json({data});
})

router.get('/detail/:id', async (req, res) => {
    const id = +req.params.id || 0;
    const data = await adsDetailModel.findById(id);

    if(data.length === 0) {
        return res.status(204).end();
    }

    return res.status(200).json({data});
})

router.post('/', async (req, res) => {
    const data = req.body;

    const result = await advertisingModel.insert({...data, is_valid: true, is_verified: VERIFY_STATE.UNVERIFIED});

    if(result === null) {
        return res.status(400).end();
    }

    return res.status(201).json({
        id: result,
        data,
        msg: "create is waiting for approver"
    });
}) 

router.patch('/:id', async (req, res) => {
    const id = +req.params.id || 0;
    const data = req.body;

    const result_old = await advertisingModel.update(id , {is_valid: false, is_verified: VERIFY_STATE.UNVERIFIED});
    const result = await advertisingModel.insert({...data, is_valid: true, is_verified: VERIFY_STATE.UNVERIFIED, old_board_id: id});

    if(result === null || result_old === null) {
        return res.status(400).json({
            msg: "update failure"
        })
    }

    return res.status(200).json({
        msg: "update is waiting for approver"
    })
})

router.delete('/:id', (req, res) => res.status(200).json({
    msg: "remove is waiting for approver"
}))

router.patch('/approve/:id', async(req, res) => {
    const id = +req.params.id || 0;
    const {action, old_id} = req.body;

    let error = true, result = undefined, result_old = undefined;

    block: {
        if(action === ADVERTISE_ACTION.UPDATE) {
            if(!old_id) break block;
            result_old = await advertisingModel.update(old_id , {is_valid: false, is_verified: VERIFY_STATE.REJECTED, is_delete: true});
            result = await advertisingModel.update(id , { is_valid: true, is_verified: VERIFY_STATE.ACCEPTED, is_delete: false });
            error = result === null || result_old === null;
        } else {
            const isValid = action === ADVERTISE_ACTION.CREATE;
            result = await advertisingModel.update(id , { is_valid: isValid, is_verified: VERIFY_STATE.ACCEPTED, is_delete: !isValid });
            error = result === null;
        }
    }  

    if(error) {
        return res.status(400).json({
            msg: "approved failure"
        })
    }

    return res.status(200).json({
        msg: "approved successfully"
    })
})

router.patch('/reject/:id', async(req, res) => {
    const id = +req.params.id || 0;
    const {action, old_id} = req.body;
    
    let error = true, result = undefined, result_old = undefined;

    block: {
        if(action === ADVERTISE_ACTION.UPDATE) {
            if(!old_id) break block;
            result_old = await advertisingModel.update(old_id , {is_valid: true, is_verified: VERIFY_STATE.ACCEPTED, is_delete: false});
            result = await advertisingModel.update(id , { is_valid: false, is_verified: VERIFY_STATE.REJECTED, is_delete: true });
            error = result === null || result_old === null;
        } else {
            const isValid = action === ADVERTISE_ACTION.DELETE;
            result = await advertisingModel.update(id , { is_valid: isValid, is_verified: VERIFY_STATE.ACCEPTED, is_delete: !isValid });
            error = result === null;
        }
    }

    if(error) {
        return res.status(400).json({
            msg: "rejected failure"
        })
    }

    return res.status(200).json({
        msg: "rejected successfully"
    })
})

export default router;