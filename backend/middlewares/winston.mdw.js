import winston from 'winston'
import expressWinston, { errorLogger } from 'express-winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = winston.format;


//custom format
const myFormat = printf(({ level, message, label, timestamp, meta }) => {
    return `${meta.date || timestamp} 
            [${label}] 
            ${level}: ${message}
            ${level === 'error' ? JSON.stringify(meta.req) : JSON.stringify(meta.res)} `;
});


const transport = new DailyRotateFile({
    filename: 'logging/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '2mb',
    maxFiles: '14d',

});

function excludeResPropFilter(res, propName) {

    const { last_update, ...rest } = res.body || {};

    return rest;
}

transport.on('new', function (filename) {
    // do something fun
    console.log(filename)
});

transport.on('rotate', function (oldFilename, newFilename) {
    // do something fun
    console.log(`rotate file: ${newFilename}`)
});



const loggerReq = expressWinston.logger({

    transports: [
        transport,
        // new winston.transports.File({
        //     filename: 'logger/error.log',
        // }),
    ],
    format: winston.format.combine(
        label({ label: 'winston' }),
        timestamp(),
        myFormat
    ),
    responseFilter: excludeResPropFilter,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    responseWhitelist: 'body',
    statusLevels: false,
    level: (req, res) => {
        if (res.statusCode >= 400) {
            return 'error';
        } else {
            return 'info';
        }
    },
    ignoreRoute: function (req, res) { return false; },
    exitOnError: false,

});

const loggerErr = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: 'logging/error.log',
        }),
    ],
    format: winston.format.combine(
        label({ label: 'winston-err' }),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.json(),
        myFormat
    ),
    statusLevels: false, // default value
    level: (req, res) => {
        return 'error';
    },
    exitOnError: false,

});


export { loggerReq, loggerErr };