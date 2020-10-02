#!/usr/bin/env electron
var d = new Date();
var logfile = __dirname + "/log_" + d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + ".txt";
var watchClipboard = require("watchClipboard");
var readline = require('readline');
var fs = require("fs");
var clipboard = require('electron').clipboard;
var yargs = require("yargs");
var argv = yargs.argv;
var json;
fs.appendFileSync("" + logfile, "\n\n##--- PROGRAM START ---##\nDate & Time: " + new Date().toString() + "\n#- OUTPUT BEGIN -#\n");
function run(json) {
    json = JSON.parse(json);
    if (typeof (json.addebug_videoId) != typeof (undefined)) {
        var output = "ID: " + json.addebug_videoId + "\n    Links:\n        Player: https://www.youtube.com/watch?v=" + json.addebug_videoId + "\n        Embed: https://www.youtube.com/embed/" + json.addebug_videoId;
        fs.appendFileSync("" + logfile, output + "\n");
        return output;
    }
    else {
        throw new Error("No ID");
    }
}
if (argv.watch || argv.w) {
    var output = "Please copy the debug info. It will load it from your clipboard.\nSince you specified the watch flag, it will auto-update to the latest information.\n----------------------------------------------------------------";
    console.log(output);
    fs.appendFileSync("" + logfile, output + "\n");
    process.stdout.write("Current URL: None");
    watchClipboard.watchChanges(function (data) {
        var e = run(data);
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        console.log(e + "\n----------------------------------------------------------------");
        fs.appendFileSync("" + logfile, "----------------------------------------------------------------" + "\n");
        setTimeout(function () {
            json = JSON.parse(data);
            process.stdout.write("Current URL: https://www.youtube.com/watch?v=" + json.addebug_videoId);
        }, 1);
    });
}
else {
    try {
        console.log("" + run(clipboard.readText()));
        process.exit(0);
    }
    catch (e) {
        console.log("Please copy the debug info. It will load it from your clipboard.");
        fs.appendFileSync("" + logfile, "Please copy the debug info. It will load it from your clipboard." + "\n");
        function retry() {
            try {
                fs.appendFileSync("" + logfile, "----------------------------------------------------------------" + "\n");
                var x = run(clipboard.readText());
                console.log("----------------------------------------------------------------\n" + x);
                process.exit(0);
            }
            catch (e) {
                setTimeout(function () {
                    retry();
                }, 250);
            }
        }
        setTimeout(function () {
            retry();
        }, 250);
    }
}
module.exports = {};
