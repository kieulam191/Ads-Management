import express from 'express';
import  adsTypeRouter from './adsType.router.js'

const app = express();

//defined router liên quan đến ads
app.use('/types', adsTypeRouter);

export default app;