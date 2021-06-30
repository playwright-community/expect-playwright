const teardown = require("jest-playwright-preset/teardown")

module.exports = async (config) => {
  await teardown(config)

  global.server.close()
}
