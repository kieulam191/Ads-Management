import express from 'express';
import  adsTypeRouter from './adsType.router.js'
import  adsTableTypeRouter from './adsTableType.route.js'
import  advertisingRouter from './advertising.route.js'

const app = express();

//defined router liên quan đến ads
app.use('/types', adsTypeRouter);
app.use('/table-types', adsTableTypeRouter);
app.use('/', advertisingRouter);

export default app;