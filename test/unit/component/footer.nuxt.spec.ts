import {it, expect} from "vitest"
import {mountSuspended} from "vitest-environment-nuxt/utils"
import {Footer} from "#components"

it("Check footer display", async () =>{
  const component = await mountSuspended(Footer)
  expect(component.findComponent("GithubIcon")).toBeTruthy()
  expect(component.findComponent("HeartIcon")).toBeTruthy()
})