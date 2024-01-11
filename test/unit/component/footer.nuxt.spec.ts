import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {Footer} from "#components"

describe("Footer", () => {
  it("Display items", async () => {
    const component = await mountSuspended(Footer)
    expect(component.findComponent("GithubIcon")).toBeTruthy()
    expect(component.findComponent("HeartIcon")).toBeTruthy()
  })
  it("Display correct license text", async () => {
    const component = await mountSuspended(Footer)
    expect(component.html()).toMatchSnapshot()
  })
})
