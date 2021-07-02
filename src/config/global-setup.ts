import http from "http"
import fs from "fs"
import path from "path"
import setup from "jest-playwright-preset/setup"
import type { Config } from "@jest/types"

const requestListener =
  (html: string) => (_: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200)
    res.end(html)
  }

export default async (config: Config.GlobalConfig) => {
  const filePath = path.join(__dirname, "iframe.html")
  const html = await fs.promises.readFile(filePath, { encoding: "utf-8" })

  global.server = http.createServer(requestListener(html))
  global.server.listen(8080)

  await setup(config)
}
