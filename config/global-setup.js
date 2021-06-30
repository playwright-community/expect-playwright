const http = require("http")
const fs = require("fs")
const path = require("path")
const setup = require("jest-playwright-preset/setup")

const requestListener = (html) => (_, res) => {
  res.writeHead(200)
  res.end(html)
}

module.exports = async (config) => {
  const filePath = path.join(__dirname, "iframe.html")
  const html = await fs.promises.readFile(filePath, { encoding: "utf-8" })

  global.server = http.createServer(requestListener(html))
  global.server.listen(8080)

  await setup(config)
}
