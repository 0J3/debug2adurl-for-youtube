((clipboard: {
    readText: () => any
}) => {
    let lastClipboardEntry: string = ""

    let clipboardFunctions = []

    class ClipboardCallback {
        constructor(callback: (arg0 ? : string) => void) {
            this.callbackid = clipboardFunctions.length
            this.callback = callback
        }

        /**
         * @name        callback
         * @description A callback that gets called per-clipboard-change
         * @type        Function
         * @argument    {Optional String} currentClipboardValue
         */
        callback: (arg0 ? : string) => any

        /**
         * @name        callbackid
         * @description A callback identifier.
         */
        callbackid: number
    }

    function watchChanges(callback: (arg0 ? : string) => void) {
        return new ClipboardCallback(callback)
    }

    function unWatchChanges(id: number | string) {
        throw new Error("Soon tm")
    }

    setInterval(() => {
        try {
            let currentClipboard = clipboard.readText()
            if (currentClipboard != lastClipboardEntry) {
                lastClipboardEntry = currentClipboard
                clipboardFunctions.forEach(function (element: ClipboardCallback) {
                    element.callback(currentClipboard)
                });
            }
        } catch (error) {

        }
    }, 15)

    module.exports = {
        watchChanges: watchChanges,
        unWatchChanges: unWatchChanges,
        internal: {
            ClipboardCallback: ClipboardCallback
        }
    }
})(require('electron').clipboard)

// type deffinitions
module.exports = {
    watchChanges: module.exports.watchChanges,
    unWatchChanges: module.exports.unWatchChanges,
    internal: {
        ClipboardCallback: module.exports.ClipboardCallback
    }
}