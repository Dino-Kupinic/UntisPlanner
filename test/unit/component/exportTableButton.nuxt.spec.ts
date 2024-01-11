import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {ExportTableButton} from "#components"

describe("ExportTableButton", () => {
  it("Display buttom correctly", async () => {
    const component = await mountSuspended(ExportTableButton)
    expect(component.html()).toMatchSnapshot()
  })
})
