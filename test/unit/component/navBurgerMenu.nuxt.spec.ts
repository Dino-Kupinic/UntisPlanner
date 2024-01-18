import {describe, test, it, expect, vi} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {NavBurgerMenu} from "#components"

describe("NavBurgerMenu", async () => {
  const component = await mountSuspended(NavBurgerMenu)

  test('it can mount properly', async () => {
    expect(component.text()).toMatchSnapshot()
  })

  it('contains a dropdown', async () => {
    expect(component.findComponent("UDropdown")).toBeTruthy()
  })

  it.skip('shows settings, info and theme toggle on click in the dropdown', async () => {
     await component.find("NavItem").trigger("click")
     await component.find("NavBarThemeToggle").trigger("click")
     await component.find("CalenderInfoBurgerMenu").trigger("click")

    //TODO: Let Dino complete "complicated" test
  });

  it('contains theme toggle', async () => {
    expect(component.findComponent("NavBarThemeToggle")).toBeTruthy()
  });

  it('is getting displayed by a NavItem', async () => {
    expect(component.findComponent("NavItem")).toBeTruthy()
  });
})
