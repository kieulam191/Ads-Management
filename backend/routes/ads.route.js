import express from 'express';
import  adsTypeRouter from './adsType.router.js'
import  adsTableTypeRouter from './adsTableType.route.js'

const app = express();

//defined router liên quan đến ads
app.use('/types', adsTypeRouter);
app.use('/table-types', adsTableTypeRouter);

export default app;