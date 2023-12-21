import {describe, test, it, beforeAll, expect} from "vitest"
import pkg from "~/package.json"

describe("useAppVersion", () => {
  let appVersion = ""

  beforeAll(() => {
    appVersion = pkg.version
  })

  test("it returns a value", async () => {
    expect(useAppVersion()).toBeDefined()
  })

  test("it returns a string", async () => {
    expect(useAppVersion()).toBeTypeOf("string")
  })

  it("returns the correct version", async () => {
    const version = useAppVersion()
    expect(version).toBe(appVersion)
  })
})
