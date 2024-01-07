import express from 'express';
import * as adsPlaceReqModel from '../models/adsPlaceReq.model.js'
import * as advertisingPlacement from '../models/advertisingPlacement.model.js';
const router =express.Router();

router.get('/', async (req, res) => {
    /*
        #swagger.description = 'Lấy tất cả yêu cầu chỉnh sửa điểm đặt quảng cáo'
     */ 
    console.log('da vao');
    const result = await adsPlaceReqModel.findAll();

    return res.status(200).json({
        result
    })
});

router.get('/:status', async (req, res) => {
     /*
        #swagger.description = 'Lấy trạng thái yêu cầu chỉnh sửa điểm đặt quảng cáo'
     */
    const status = +req.params.status || 0;
    const result = await adsPlaceReqModel.findByStatus(status);

    if(result === null) {
        return res.status(204).end()
    }

    return res.status(200).json({
        result
    })
});

router.post('/', async (req, res) => {
     /*
        #swagger.description = 'Gửi yêu cầuchỉnh sửa điểm đặt quảng cáo đến sở vhtt'
     */

    const result = await adsPlaceReqModel.insert(req.body);

    if(result === null) {
        return res.status(400).json('data invalid')
    }


    return res.status(200).json({
        status: 0,
        msg: "đang chờ phê duyệt"
    })
})

//chỉ cho phép thay đổi những yêu cầu hiện tại có status là 0
router.patch('/:id', async (req, res) => {
     /*
        #swagger.description = 'Thay đổi yêu cầu chỉnh sửa điểm đặt quảng cáo từ sở vhtt'
     */
    const id = +req.params.id || 0;
    const status = req.body.new_status;

    const result = await adsPlaceReqModel.updateStatus(id, status) 

    if(result === null) {
       return  res.status(404).json({
            msg: "place request not available"
        })
    }

    //từ chối thay đổi
    if(status === -1) {
        return  res.status(200).json({
            msg: "place request was reject."
        })
    }

    //đồng ý thay đổi;
    if(status === 1) {
        const data = await adsPlaceReqModel.findById(id);
        console.log(data);
        const result = await advertisingPlacement.updateAfterApprove(data);

        if(result === 1) {
            return  res.status(200).json({
                msg: "palce data successfully"
            })
        }else {
            return  res.status(400).json({
                msg: "update data failure"
            })
        }
    } 

   

})

export default router;