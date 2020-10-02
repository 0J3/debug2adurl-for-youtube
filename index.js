var watchClipboard = require("./watchClipboard");
var clipboard = require('electron').clipboard;
var yargs = require("yargs");
var json;
function run() {
    json = clipboard.readText();
    json = JSON.parse(json);
    console.log("ID: " + json.ad_debug_videoId + "\n    Links:\n    Player: https://www.youtube.com/watch?v=" + json.ad_debug_videoId + "\n    Embed: https://www.youtube.com/embed/" + json.ad_debug_videoId);
}
if (yargs.watch) {
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
                console.log("----------------------------------------------------------------");
                run();
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
var lastClipboardEntry = "";
var clipboardFunctions = [];
var ClipboardCallback = /** @class */ (function () {
    function ClipboardCallback(callback) {
        this.callbackid = clipboardFunctions.length;
        clipboardFunctions[this.callbackid] = self;
        this.callback = callback;
    }
    return ClipboardCallback;
}());
function watchChanges(callback) {
    return new ClipboardCallback(callback);
}
function unWatchChanges(id) {
    throw new Error("Soontm");
}
module.exports = {
    watchChanges: watchChanges,
    unWatchChanges: unWatchChanges
};
