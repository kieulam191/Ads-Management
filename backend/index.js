import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import accountRouter from './routes/account.route.js'
import areaRouter from './routes/area.route.js'
import adsRouter from './routes/ads.route.js'
import reportRouter from './routes/report.router.js'
import positionRouter from './routes/position.route.js'

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.use('/accounts', accountRouter)
app.use('/areas', areaRouter)
app.use('/ads', adsRouter)
app.use('/reports', reportRouter)
app.use('/pos/', positionRouter)
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))

