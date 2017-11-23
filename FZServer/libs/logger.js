/**
 * Created by zhangyiqing on 16/10/27.
 *
 * /lib/logger.js
 */

var log4js = require('log4js');

var appenders = {
  type: 'console'
}

// 如果是sit，pre或prd环境，部署在linux上，log file
if (process.env.NODE_ENV) {
  appenders = { type: 'file', filename: '/opt/logs/node/out.log' }
}

log4js.configure({
  appenders: [
        { type: 'console' },
        // { type: 'file', filename: 'out.log' },
    appenders,
  ]
});

var logger = log4js.getLogger('CM');

logger.connectLogger = log4js.connectLogger(logger);

module.exports = logger;
