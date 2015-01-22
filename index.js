var config = null;
var tags = {};
var colors = require('colors');
module.exports.config = function (cfg) {
    config = cfg;
};
module.exports.log = function (o) {
    if (config[o] === true) {
        tags[o] = function () {
            var now = new Date();
            var timestamp = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " |";
            var args = Array.prototype.slice.call(arguments);
            args.unshift(timestamp.red, (o + ':').green);
            console.log.apply(console, args);
        }
        return tags[o];
    } else {
        return function () {
        }
    }
};