const assert = require("assert")
const path = require("path")

const electronPath = require("electron")
const playwright = require("playwright")

const electron = playwright._electron

async function startApp() {
    const app = await electron.launch({
        args: [path.join(__dirname, "..", "app", "main.js")],
        executablePath: electronPath,
    })

    const page = await app.firstWindow()
    page.setDefaultTimeout(2000)
    await page.waitForSelector("span") // Wait until the window is actually loaded

    return [app, page]
}

describe("Sample integration test", () => {
    let app = null
    let page = null

    before(async () => ([app, page] = await startApp()))

    after(async () => await app.close())

    it("opens a window", () => {
        assert.notEqual(app, null)
        assert.notEqual(page, null)
    })
})
