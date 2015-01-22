var config = null;
var tags = {};
var colors = require('colors');
module.exports.config = function (cfg) {
    config = JSON.parse(JSON.stringify(cfg));
};
module.exports.log = function (o) {
    var callerName = getObjectClass(o);
    if (config[callerName] === true) {
        tags[callerName] = function () {
            var now = new Date();
            var timestamp = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " |";
            var args = Array.prototype.slice.call(arguments);
            args.unshift(timestamp.red, (callerName + ':').green);
            console.log.apply(console, args);
        }
        return tags[o];
    } else {
        return function () {
        }
    }
};


function getObjectClass(obj) {  //is used by identifying Caller class
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }
    return undefined;
}