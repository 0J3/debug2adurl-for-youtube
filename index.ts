const watchClipboard = require("./watchClipboard")

const {
    clipboard
} = require('electron')

const yargs = require("yargs")

let json

function run() {
    json = clipboard.readText()
    json = JSON.parse(json)
    console.log(`ID: ${json.ad_debug_videoId}
    Links:
    Player: https://www.youtube.com/watch?v=${json.ad_debug_videoId}
    Embed: https://www.youtube.com/embed/${json.ad_debug_videoId}`)
}

if (yargs.watch) {
    console.log("Please copy the debug info. It will load it from your clipboard.")
    console.log("Since you specified the watch flag, it will auto-update to the latest information.")
} else {
    try {
        run()
        process.exit(0)
    } catch (e) {
        console.log("Please copy the debug info. It will load it from your clipboard.")

        function retry() {
            try {
                console.log(`----------------------------------------------------------------`)
                run()
                process.exit(0)
            } catch (e) {
                setTimeout(() => {
                    retry()
                }, 250);
            }
        }
        setTimeout(() => {
            retry()
        }, 250);
    }
}

module.exports={}
