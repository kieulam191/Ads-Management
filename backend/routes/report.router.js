import express from 'express';
import reportTypeRouter from './reportType.route.js'
import reportAnalytisRouter from './reportAnalytis.router.js'
const app = express();

//defined router liên quan đến report
app.use('/types', reportTypeRouter);
app.use('/analysis', reportAnalytisRouter);

export default app;