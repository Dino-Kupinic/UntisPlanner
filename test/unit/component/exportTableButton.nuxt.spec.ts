import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {ExportTableButton} from "#components"

describe("ExportTableButton", () => {
  it("Display button correctly", async () => {
    const component = await mountSuspended(ExportTableButton)
    expect(component.html()).toMatchSnapshot()
  })

  // TODO: Test modal
})
