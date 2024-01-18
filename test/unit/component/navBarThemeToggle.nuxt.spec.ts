import {describe, test, expect, vi} from "vitest"
import {mockNuxtImport, mountSuspended, renderSuspended} from "@nuxt/test-utils/runtime"
import {NavBarThemeToggle} from "#components"

// TODO: fix mock
// mockNuxtImport("useColorMode", () => {
//   return () => {
//     return {
//       preference: "light",
//     }
//   }
// })

describe("NavBarThemeToggle", async () => {
  // const component = await mountSuspended(NavBarThemeToggle)
  //
  // test("it can mount properly", async () => {
  //   expect(component.text()).toMatchSnapshot()
  // })
})

