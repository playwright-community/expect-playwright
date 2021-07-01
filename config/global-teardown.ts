import teardown from "jest-playwright-preset/teardown"
import type { Config } from "@jest/types"

export default async (config: Config.GlobalConfig) => {
  await teardown(config)
  global.server.close()
}
