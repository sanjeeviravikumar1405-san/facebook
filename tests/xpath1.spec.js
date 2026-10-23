
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    await page.locator('//li[contains(@class,"product-base")]').first().waitFor();

    const count = await page.locator('//li[contains(@class,"product-base")]').count();
    console.log('Total elements count:', count);

    const prices = await page.locator('//span[contains(@class,"product-discountedPrice")]').allTextContents();

    const amounts = prices.map(price =>
        Number(price.replace(/[^\d]/g, ''))
    );

    const minPrice = Math.min(...amounts);

    console.log('Minimum price: ₹' + minPrice);

    const minPriceElement = page.locator(
        `//span[contains(@class,"product-discountedPrice") and normalize-space()="${prices[amounts.indexOf(minPrice)]}"]`
    ).first();

    const product = minPriceElement.locator(
        'xpath=ancestor::li[contains(@class,"product-base")]'
    );

    const brand = await product.locator(
        './/h3[contains(@class,"product-brand")]'
    ).textContent();

    console.log('Brand name: ' + brand?.trim());

});
