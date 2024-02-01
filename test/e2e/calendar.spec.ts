import {test, expect} from "@playwright/test"

test("Calendar", async ({page}) => {
  await page.goto('/');
  // TODO
  // await page.getByRole('button', { name: 'Februar 2033' }).click();
  // await page.getByLabel('März', { exact: true }).click();
  // await page.locator('button:nth-child(2)').click();
  // await page.getByLabel('Sonntag, 5. Nov.').nth(1).click();
})