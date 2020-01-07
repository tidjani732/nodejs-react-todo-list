const path = require('path');
const { format, createLogger, transports } = require('winston');
require('winston-daily-rotate-file');

const level = process.env.LOG_LEVEL || "info";


// const log = bunyan.createLogger({
//     name: "TodoApp",
//     streams: [
//         {
//             level,
//             stream: process.stdout
//         },
//         {
//             level: "error",
//             path: path.join(__dirname, '..', 'logs', 'loggs.log')
//         }
//     ]
// })

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}  ${level}: ${JSON.stringify(message)}`;
});

const dir = path.join(__dirname, '..', 'logs')


const log = createLogger({
    level,
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({
            filename: '_error.log',
            level: 'error',
            dirname: dir
        }),
        new transports.Console({
            colorize: true,
        }),
        new transports.DailyRotateFile({
            filename: "app.log",
            dirname: dir,
            maxsize: 20971520,
            maxFiles: 25,
            datePattern: 'YYYY_MM_DD',
        })
    ]
});


module.exports = log;
