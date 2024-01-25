import {describe, test, it, expect, vi} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {NavItem} from "#components"

describe("NavItem", async () => {
  const component = await mountSuspended(NavItem)

  test("it can mount properly", async () => {
    expect(component.text()).toMatchSnapshot()
  })

  it("contains a UButton", async () => {
    expect(component.findComponent("UButton")).toBeTruthy()
  })
})
