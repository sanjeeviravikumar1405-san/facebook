
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    // Task 1: Total product count
    const products = page.locator('//li[contains(@class,"product-base")]');
    await products.first().waitFor();

    const count = await products.count();
    console.log('Total elements count:', count);

    // Task 2: Get discount price or regular price for each product
    const details = await products.evaluateAll(cards =>
        cards.map(card => {
            const discount = card.querySelector('span.product-discountedPrice');
            const regular = card.querySelector('div.product-price > span:not([class])');

            const priceElement = discount || regular;
            const priceText = priceElement?.textContent?.trim() || '';
            const price = Number(priceText.replace(/[^\d]/g, ''));

            return {
                price,
                priceText
            };
        })
    );

    // Task 3: Find minimum price
    const validProducts = details.filter(item => item.price > 0);
    expect(validProducts.length).toBeGreaterThan(0);

    const minimumPrice = Math.min(...validProducts.map(item => item.price));

    console.log('Minimum price: ₹' + minimumPrice);

    // Task 4: Find product name using dynamic XPath
    const minProductXPath =
        `//li[contains(@class,"product-base")]` +
        `[.//div[contains(@class,"product-price")]//span[` +
        `((contains(@class,"product-discountedPrice") or not(@class)) ` +
        `and normalize-space()="Rs. ${minimumPrice}")]]` +
        `//h4[(@class,"product-product")]`;

    const minProductName = await page.locator(minProductXPath).first().textContent();

    console.log('Product name:', minProductName?.trim());

});
