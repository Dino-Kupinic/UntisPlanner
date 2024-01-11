import {describe, expect, it} from "vitest"
import {Calendar} from "#components"
import {mountSuspended} from "@nuxt/test-utils/runtime"

describe("Calendar", async () => {
  const component = await mountSuspended(Calendar)

  it("is mounted properly", async () => {
    expect(component.text()).toMatchSnapshot()
  })
})

