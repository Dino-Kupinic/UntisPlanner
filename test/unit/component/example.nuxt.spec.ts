import {it, expect, describe} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {Example} from "#components"

describe("Example Component", () => {
  it("can mount some component", async () => {
    const component = await mountSuspended(Example)
    expect(component.html()).toMatchSnapshot("<p>Example</p>")
  })
})
