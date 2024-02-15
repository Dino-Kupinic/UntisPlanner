import {describe, test, it, expect, vi} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {CalendarInfoButton} from "#components"

describe("CalendarInfoButton", async () => {
  const component = await mountSuspended(CalendarInfoButton)

  test("it can mount properly", async () => {
    expect(component.text()).toMatchSnapshot()
  })

  it("contains the correct label", async () => {
    expect(component.text()).toBe("Info")
  })

  it("contains a button", async () => {
    expect(component.find("button").exists()).toBeTruthy()
  })

  it.skip("shows a floating window when clicked", async () => {
    await component.find("button").trigger("click")
    // TODO: complete test
  })

  it("has the correct distance and trigger", async () => {
    expect(component.findComponent("VDropdown").attributes()).toStrictEqual({distance: "10", triggers: "click"})
  })
})
