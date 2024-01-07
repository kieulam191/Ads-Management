import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import accountRouter from './routes/account.route.js'
import areaRouter from './routes/area.route.js'
import adsRouter from './routes/ads.route.js'
import reportRouter from './routes/report.router.js'
import positionRouter from './routes/position.route.js'
import testRouter from './routes/test.route.js'
import authMDW from './middlewares/auth.mdw.js'
import authRoutes from "./routes/auth.route.js";
import provinceRouter from './routes/province.route.js';
import dictrictRouter from './routes/district.route.js';
import wardRouter from './routes/ward.route.js'
import advertisinglocationsRouter from './routes/advertisinglocations.route.js';
import reportviolationsRouter from './routes/reportviolations.route.js';
import adsReq from './routes/adsReq.router.js';
import adsPlaceReq from './routes/adsPlaceReq.route.js';
import adsCompanyRouter from './routes/adsCompany.route.js';
import advertisingPlacementRouter from './routes/advertisingPlacement.route.js';
import advertisingBoardRouter from './routes/advertisingBoard.route.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loggerReq, loggerErr } from './middlewares/winston.mdw.js'
import swaggerUi  from 'swagger-ui-express'
import swaggerDocument from './swagger-output.json' assert {type : "json"}
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())
// const corsOrigin ={
//     origin:'http://localhost:5173', //or whatever port your frontend is using
//     credentials:true,            
//     optionSuccessStatus:200
// }
// app.use(cors(corsOrigin));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authMDW);


// user auth
app.use(loggerReq)

// Lâm
app.use('/accounts', accountRouter)
app.use('/areas', areaRouter)
app.use('/ads/requests',adsReq);
app.use('/places/requests',adsPlaceReq);
app.use('/ads', adsRouter)
app.use('/reports', reportRouter)
app.use('/pos/', positionRouter);
// Minh 
app.use('/test/',testRouter)
app.use("/auth", authRoutes);
app.use('/provinces',provinceRouter);
app.use('/dictricts',dictrictRouter);
app.use('/wards',wardRouter);
// app.use('/advertisinglocations',advertisinglocationsRouter);
app.use('/reportviolations',reportviolationsRouter);
app.use('/advertisingPlacement',advertisingPlacementRouter); // điểm đặt quảng cáo
app.use('/adsCompany',adsCompanyRouter);
app.use('/advertisingBoard',advertisingBoardRouter); // bảng quảng cáo

//floder images public
app.use('/images', express.static(__dirname + '/images'));
app.use(loggerErr)

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))

