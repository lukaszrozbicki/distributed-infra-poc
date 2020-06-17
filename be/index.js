const fs = require("fs")
const path = require("path")
const express = require("express")
const cors = require("cors")
const dummyData = require("./dummy-data")

const appDirectory = fs.realpathSync(process.cwd())
const dotenvPath = path.resolve(appDirectory, ".env")

require("dotenv").config({
  path: dotenvPath
})

const app = express()
const port = 3001
const feAppHost = process.env.FRONTEND_APP_HOST

app.use(cors({
  origin: feAppHost
}))

app.get(
  "/api",
  (req, res) => {
    res.send(dummyData)
  },
)

app.get(
  "/iframe",
  (req, res) => {
    fs.readFile(
      path.join(__dirname + "/dummy-iframe.html"),
      "utf8",
      (err, dummyIframe) => {
        const iframeContent = dummyIframe.replace("%FRONTEND_APP_HOST%", feAppHost)

        res.setHeader(
          "Content-Security-Policy",
          `frame-ancestors ${feAppHost}; sandbox allow-scripts allow-same-origin`,
        )
        res.send(iframeContent)
      }
    )
  }
)

app.listen(port, () => console.log(`PoC BE app listening at http://localhost:${port}`))
