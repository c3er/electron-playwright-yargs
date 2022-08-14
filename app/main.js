const electron = require("electron")
const path = require("path")

function createWindow() {
    const mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    })
    mainWindow.loadFile(path.join(__dirname, "index.html"))
}

electron.app.whenReady().then(() => {
    createWindow()

    electron.app.on("activate", () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron.app.quit()
    }
})
