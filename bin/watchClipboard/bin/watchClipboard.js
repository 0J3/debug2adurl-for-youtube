(function (clipboard) {
    var lastClipboardEntry = "";
    var clipboardFunctions = [];
    var ClipboardCallback = /** @class */ (function () {
        function ClipboardCallback(callback) {
            this.callbackid = clipboardFunctions.length;
            this.callback = callback;
        }
        return ClipboardCallback;
    }());
    function watchChanges(callback) {
        return new ClipboardCallback(callback);
    }
    function unWatchChanges(id) {
        throw new Error("Soon tm");
    }
    setInterval(function () {
        try {
            var currentClipboard_1 = clipboard.readText();
            if (currentClipboard_1 != lastClipboardEntry) {
                lastClipboardEntry = currentClipboard_1;
                clipboardFunctions.forEach(function (element) {
                    element.callback(currentClipboard_1);
                });
            }
        }
        catch (error) {
        }
    }, 15);
    module.exports = {
        watchChanges: watchChanges,
        unWatchChanges: unWatchChanges,
        internal: {
            ClipboardCallback: ClipboardCallback
        }
    };
})(require('electron').clipboard);
// type deffinitions
module.exports = {
    watchChanges: module.exports.watchChanges,
    unWatchChanges: module.exports.unWatchChanges,
    internal: {
        ClipboardCallback: module.exports.ClipboardCallback
    }
};
