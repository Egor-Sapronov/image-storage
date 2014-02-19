var winston = require('winston');

function getLogger(module){
    var path=module.fileName.split('/').slice(-2).join('/');

    return new winston.logger({
        transport:[
            new winston.transports.Console({
                colorize:true,
                level:'debug',
                label:path
            })
        ]
    })
}

module.exports=getLogger;