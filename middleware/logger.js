const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file');

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/rotate-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});

const winston = createLogger({
    level: 'debug',
    format: combine(label({ label: 'HTTP-LOG' }), timestamp(), customFormat),
    transports: [fileRotateTransport],
});

const logger = (req, res, next) => {
    winston.info(req.url);
    next();
};

module.exports = { logger, winston };
