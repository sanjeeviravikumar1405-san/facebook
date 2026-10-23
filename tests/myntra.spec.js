import { test } from '@playwright/test';

test('brand of minimum price product', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    const products = page.locator('//li[contains(@class,"product-base")]');
    await products.first().waitFor();

    // 1. all prices -> minimum
    const prices = await page.locator('//span[contains(@class,"product-discountedPrice")]').allTextContents();
    const amounts = prices.map(price => Number(price.replace(/[^\d]/g, '')));
    const minPrice = Math.min(...amounts);

    // 2. find the product card that has this minimum price
    const minCard = products.filter({ hasText: new RegExp('Rs\\. ?' + minPrice + '(?!\\d)') }).first();

    // 3. brand name from that same card
    const brand = await minCard.locator('xpath=.//h3[contains(@class,"product-brand")]').textContent();

    console.log('Minimum price: ₹' + minPrice);
    console.log('Brand name: ' + brand);
});