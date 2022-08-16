const path = require("path")

const electron = require("electron")
const log4js = require("log4js")

let logger

function createWindow() {
    const mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    })
    mainWindow.on("closed", () => logger.debug("Window closed"))
    mainWindow.loadFile(path.join(__dirname, "index.html"))
}

electron.app.whenReady().then(() => {
    log4js.configure({
        appenders: {
            default: { type: "file", filename: path.join(__dirname, "..", "default.log") },
        },
        categories: { default: { appenders: ["default"], level: "debug" } },
    })
    logger = log4js.getLogger("default")

    createWindow()

    electron.app.on("activate", () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    logger.info("Application started")
})

electron.app.on("window-all-closed", () => {
    logger.debug("Last window closed")
    if (process.platform !== "darwin") {
        electron.app.quit()
    }
})
