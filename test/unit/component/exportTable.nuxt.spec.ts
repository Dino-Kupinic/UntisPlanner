import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {ExportTable} from "#components"

describe("ExportTable", () => {
  it.skip("Display data correctly", async () => {
    const component = await mountSuspended(ExportTable)
    expect(component.html()).toMatchSnapshot()
  })
})
