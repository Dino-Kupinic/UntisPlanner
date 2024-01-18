import {describe, test, it, expect, vi} from "vitest"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {NavBar} from "#components";

describe("NavBar", async () => {
  const component = await mountSuspended(NavBar)

  test('it can mount properly', async () => {
    expect(component.text()).toMatchSnapshot()
  });

  it ('contains boxes for content', async() => {
    expect(component.findComponent("UContainer").exists()).toBeTruthy();
  });

  it ('contains theme toggle', async () => {
    expect(component.findComponent("NavBarThemeToggle").exists()).toBeTruthy();
  });

  it ('', async  () => {
      expect(component.findComponent("#BurgerMenuContainer").exists()).toBeTruthy()
  });

  it ('contains Menu Items', async () => {
    expect(component.findComponent("NavItem").exists()).toBeTruthy();
    expect(component.findComponent("CalendarInfoButton").exists()).toBeTruthy();
  });

  it.skip('shows the BurgerMenu and hides the normal Menu responsive', async () => {
      //global.innerWidth = 775;

      global.dispatchEvent(new Event('resize'));

      expect(component.findComponent("UContainer"))

  })
})
