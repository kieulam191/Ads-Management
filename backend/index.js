import express from 'express';
import cors from 'cors';
import accountRouter from './routes/account.route.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/accounts', accountRouter)
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))

