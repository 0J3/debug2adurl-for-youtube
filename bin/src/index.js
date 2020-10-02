#!/usr/bin/env electron
var watchClipboard = require("watchClipboard");
var clipboard = require('electron').clipboard;
var yargs = require("yargs");
var argv = yargs.argv;
var json;
function run() {
    json = clipboard.readText();
    json = JSON.parse(json);
    return "ID: " + json.addebug_videoId + "\nLinks:\n    Player: https://www.youtube.com/watch?v=" + json.addebug_videoId + "\n    Embed: https://www.youtube.com/embed/" + json.addebug_videoId;
}
if (argv.watch || argv.w) {
    console.log("Please copy the debug info. It will load it from your clipboard.");
    console.log("Since you specified the watch flag, it will auto-update to the latest information.");
}
else {
    try {
        run();
        process.exit(0);
    }
    catch (e) {
        console.log("Please copy the debug info. It will load it from your clipboard.");
        function retry() {
            try {
                var x = run();
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
