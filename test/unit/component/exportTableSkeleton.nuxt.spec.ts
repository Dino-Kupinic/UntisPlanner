import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {ExportTable} from "#components"

describe("ExportTableSkeleton", () => {
  it.skip("Display correctly", async () => {
    const component = await mountSuspended(ExportTable)
    expect(component.html()).toMatchSnapshot()
  })
})
