
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    // Task 1: Get discounted prices
    const prices = await page.locator(
        '//li[@class="product-base"]//span[@class="product-discountedPrice"]'
    ).allTextContents();

    const amounts = prices
        .map(price => Number(price.replace(/[^\d]/g, '')))
        .filter(price => price > 0);

    // Task 2: Find minimum price
    const minimumPrice = Math.min(...amounts);

    console.log('Minimum price: ₹' + minimumPrice);

    // Task 3: XPath to find minimum price (discounted or non-discounted)
    const minPriceElement = page.locator(
        `//li[@class="product-base"]//div[@class="product-price"]//span[((@class="product-discountedPrice" and normalize-space()="Rs. ${minimumPrice}") or (not(@class) and normalize-space()="Rs. ${minimumPrice}"))]`
    );

    console.log('Minimum price matches:', await minPriceElement.count());

    // Task 4: Find product name using minimum price
    const productName = await page.locator(
        `//li[@class="product-base"]//span[@class="product-discountedPrice" and normalize-space()="Rs. ${minimumPrice}"]/ancestor::li[@class="product-base"]//h4[@class="product-product"]`
    ).first().textContent();

    console.log('Product name:', productName?.trim());

});
