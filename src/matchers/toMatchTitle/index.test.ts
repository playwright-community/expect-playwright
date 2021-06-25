import { assertSnapshot } from "../tests/utils"

describe("toMatchTitle", () => {
  afterEach(() => page.setContent(""))

  describe("with string argument", () => {
    it("positive", async () => {
      await page.setContent("<title>Foo</title>")
      await expect(page).toMatchTitle("Foo")
    })

    it("negative", async () => {
      await page.setContent("<title>Foobar</title>")
      await assertSnapshot(() => expect(page).toMatchTitle("Foo"))
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent("<title>Foobar</title>")
        await expect(page).not.toMatchTitle("Foo")
      })

      it("negative", async () => {
        await page.setContent("<title>Foo</title>")
        await assertSnapshot(() => expect(page).not.toMatchTitle("Foo"))
      })
    })
  })

  describe("with regex argument", () => {
    it("positive", async () => {
      await page.setContent("<title>Foobar</title>")
      await expect(page).toMatchTitle(/foo/i)
    })

    it("negative", async () => {
      await page.setContent("<title>Foobar</title>")
      await assertSnapshot(() => expect(page).toMatchTitle(/Bar/))
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent("<title>Foo</title>")
        await expect(page).not.toMatchTitle(/bar/)
      })

      it("negative", async () => {
        await page.setContent("<title>Foobar</title>")
        await assertSnapshot(() => expect(page).not.toMatchTitle(/Foo/))
      })
    })
  })
})
