#!/usr/bin/env electron
var watchClipboard = require("watchClipboard");
var readline = require('readline');
var clipboard = require('electron').clipboard;
var yargs = require("yargs");
var argv = yargs.argv;
var json;
function run(json) {
    json = JSON.parse(json);
    return "ID: " + json.addebug_videoId + "\nLinks:\n    Player: https://www.youtube.com/watch?v=" + json.addebug_videoId + "\n    Embed: https://www.youtube.com/embed/" + json.addebug_videoId;
}
if (argv.watch || argv.w) {
    console.log("Please copy the debug info. It will load it from your clipboard.");
    console.log("Since you specified the watch flag, it will auto-update to the latest information.");
    console.log("----------------------------------------------------------------");
    watchClipboard.watchChanges(function (data) {
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        console.log(run(data) + "\n----------------------------------------------------------------");
        process.stdout.write("Current URL: https://www.youtube.com/watch?v=" + json.addebug_videoId);
    });
}
else {
    try {
        console.log("" + run(clipboard.readText()));
        process.exit(0);
    }
    catch (e) {
        console.log("Please copy the debug info. It will load it from your clipboard.");
        function retry() {
            try {
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
