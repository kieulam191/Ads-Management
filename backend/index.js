import express from 'express';
import cors from 'cors';
import accountRouter from './routes/account.route.js'
import areaRouter from './routes/area.route.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/accounts', accountRouter)
app.use('/areas', areaRouter)
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))

