let lastClipboardEntry: string = ""

let clipboardFunctions = []

class ClipboardCallback{
    constructor(callback: (arg0?: string) => void) {
        this.callbackid=clipboardFunctions.length
        clipboardFunctions[this.callbackid]=self
        this.callback=callback
    }
    callback: (arg0: string) => any
    callbackid: number
}

function watchChanges(callback: (arg0?: string) => void) {
    return new ClipboardCallback(callback)
}
function unWatchChanges(id: number | string) {
    throw new Error("Soontm")
}


module.exports = {
    watchChanges: watchChanges,
    unWatchChanges: unWatchChanges
}
