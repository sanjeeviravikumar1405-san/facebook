
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    // Task 1: Total products count
    const count = await page.locator(
        '//li[@class="product-base"]'
    ).count();

    console.log('Total products count:', count);

    // Task 2: Get discounted prices
    const discountedPrices = await page.locator(
        '//li[@class="product-base"]//span[@class="product-discountedPrice"]'
    ).allTextContents();

    // Get non-discounted prices
    const nonDiscountedPrices = await page.locator(
        "//li[@class='product-base']//div[@class='product-price']/span[not(@class) and (normalize-space(),'Rs.')]"
    ).allTextContents();

    // Combine both price types
    const amounts = [...discountedPrices, ...nonDiscountedPrices]
        .map(price => Number(price.replace(/[^\d]/g, '')))
        .filter(price => price > 0);

    // Task 3: Find minimum price
    const minimumPrice = Math.min(...amounts);

    console.log('Minimum price: ₹' + minimumPrice);

    // Task 4: Find product name using minimum price
    const minProductName = await page.locator(
        `//li[@class="product-base"][.//div[@class="product-price"]//span[normalize-space()="Rs. ${minimumPrice}"]]//h4[@class="product-product"]`
    ).first().textContent();

    console.log('Product name:', minProductName?.trim());

});
