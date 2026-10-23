import { test } from "@playwright/test";
test('handling frames', async ({ page }) => {
    await page.goto("https://www.hyrtutorials.com/p/frames-practice.html");
    const frame1 = await page.frameLocator("#frm1");
    const frame2 = await page.frameLocator("#frm2");
    await frame2.getByPlaceholder("Enter First Name").fill("sanjeevi");
    await frame2.getByPlaceholder("lastName").fill("kumar");
    await frame2.getByLabel("Male").check();
    await frame2.locator(`//input[@id="englishchbx"]`).check();
    await frame2.getByPlaceholder("Enter Email").fill("sanjeevi.ravikumar19@gmail.com");
   // const frame3 = await page.frameLocator("frm3");

    await frame1.locator("#course").selectOption();

})