import { join } from 'path';
import { format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';
// import bunyan from 'bunyan';
// import path from 'path';

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

const customFormat = printf(({ level, message, timestamp, stack }) => {
    if (stack) {
        //if (typeof stack !== "string") stack = JSON.stringify(stack);
        return `${timestamp}  ${level}: ${message} : [Stack : ${stack}]`;
    }
    return `${timestamp}  ${level}: ${message}`;
});

const dir = join(__dirname, '..', 'logs')


const log = createLogger({
    level,
    format: combine(
        timestamp(),
        customFormat
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


export default log;
