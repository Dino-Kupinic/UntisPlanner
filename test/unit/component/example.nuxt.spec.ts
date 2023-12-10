import {it, expect} from "vitest"
import {mountSuspended} from "vitest-environment-nuxt/utils"
import {Example} from "#components"

it("can mount some component", async () => {
  const component = await mountSuspended(Example)
  expect(component.html()).toMatchSnapshot("<p>Example</p>")
})