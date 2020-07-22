import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint } = format;

import * as path from 'path';
const parentDir = path.resolve(__dirname, '..');
const LOG_FILE_PATH = `${parentDir}/logs/app.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: LOG_FILE_PATH,
        handleExceptions: true,
        json: true,
        maxsize: MAX_FILE_SIZE,
        maxFiles: MAX_FILES,
        colorize: false,
    },
    error: {
        level: 'error',
        filename: LOG_FILE_PATH,
        handleExceptions: true,
        json: true,
        maxsize: MAX_FILE_SIZE,
        maxFiles: MAX_FILES,
        colorize: false,
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
    ),
    transports: [
        new transports.Console(),
        new transports.File(options.file),
        new transports.File(options.error),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

export default logger;