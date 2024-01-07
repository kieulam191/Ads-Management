import express from 'express';
import * as adsReqModel from '../models/adsReq.model.js'
import * as advertisingLocationModel from  "../models/advertisinglocations.model.js";
const router =express.Router();

router.get('/', async (req, res) => {
    console.log('da vao');
    const result = await adsReqModel.findAll();

    return res.status(200).json({
        result
    })
});

router.get('/:status', async (req, res) => {
    const status = +req.params.status || 0;
    const result = await adsReqModel.findByStatus(status);

    if(result === null) {
        return res.status(204).end()
    }

    return res.status(200).json({
        result
    })
});

router.post('/', async (req, res) => {


    const result = await adsReqModel.insert(req.body);

    if(result === null) {
        return res.status(400).json('data invalid')
    }


    return res.status(200).json({
        msg: "đang chờ phê duyệt"
    })
})

//chỉ cho phép thay đổi những yêu cầu hiện tại có status là 0
router.patch('/:id', async (req, res) => {
    const id = +req.params.id || 0;
    const status = req.body.new_status;

    const result = await adsReqModel.updateStatus(id, status) 

    if(result === null) {
       return  res.status(404).json({
            msg: "ad request not available"
        })
    }

    //từ chối thay đổi
    if(status === -1) {
        return  res.status(200).json({
            msg: "ads request was reject."
        })
    }

    //đồng ý thay đổi;
    if(status === 1) {
        const data = await adsReqModel.findById(id);
        const result = await advertisingLocationModel.updateAfterApprove(data);

        if(result === 1) {
            return  res.status(200).json({
                msg: "update data successfully"
            })
        }
    } 

   

})

export default router;
