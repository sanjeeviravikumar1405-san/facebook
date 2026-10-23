
import { test } from '@playwright/test';

test('Maximum Rating', async ({ page }) => {

    await page.goto('https://www.amazon.in');

    await page.locator('#twotabsearchtextbox').fill('iPhone 17 Pro');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(3000);

    const ratings = await page.locator(
        '//span[contains(text(),"iPhone 17 Pro")]/ancestor::div[@data-cy="title-recipe"]/following-sibling::div[@data-cy="reviews-block"]//span[@aria-hidden="true"]'
    ).allTextContents();

    const values = ratings
        .map(r => Number(r.match(/\d+(\.\d+)?/)?.[0]))
        .filter(r => r > 0 && r <= 5);

    if (values.length > 0) {
        console.log('Maximum Rating:', Math.max(...values));
    } else {
        console.log('Rating not found. Check your XPath.');
    }
});
