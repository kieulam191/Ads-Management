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
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

// user auth
app.use(authMDW);

app.use('/accounts', accountRouter)
app.use('/areas', areaRouter)
app.use('/ads', adsRouter)
app.use('/reports', reportRouter)
app.use('/pos/', positionRouter)
app.use('/test/',testRouter)
app.use("/auth", authRoutes);;
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))

