import express from 'express';
import reportTypeRouter from './reportType.route.js'

const app = express();

//defined router liên quan đến report
app.use('/types', reportTypeRouter);

export default app;