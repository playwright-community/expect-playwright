declare module "jest-playwright-preset/setup" {
  import { Config } from "@jest/types"
  function setup(config: Config.GlobalConfig): Promise<void>
  export default setup
}

declare module "jest-playwright-preset/teardown" {
  import { Config } from "@jest/types"
  function teardown(config: Config.GlobalConfig): Promise<void>
  export default teardown
}

declare namespace NodeJS {
  interface Global {
    server: import("http").Server
  }
}
