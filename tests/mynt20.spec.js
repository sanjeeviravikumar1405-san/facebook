import { test, expect, Page } from '@playwright/test';

test('Find minimum price and product name', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    // Task 1: Total products
    const count = await page.locator(
        '//li[@class="product-base"]'
    ).count();

    console.log('Total products:', count);

    // Task 2: Discount and non-discount prices
    const prices = await page.locator(
        '//div[@class="product-price"]//span[@class="product-discountedPrice"] | //div[@class="product-price"]/span[not(@class) and text()]'
    ).allTextContents();

    const amounts = prices
        .map(price => Number(price.replace(/[^\d]/g, '')))
        .filter(price => price > 0);

    expect(amounts.length).toBeGreaterThan(0);

    const minimumPrice = Math.min(...amounts);
    console.log('Minimum price: ₹' + minimumPrice);

    // Task 3: Call the function
    const productName = await getProductName(page, minimumPrice);

    console.log('Product name:', productName);
    expect(productName).not.toBe('Product name not found');
});

// Function with parameters and return type
async function getProductName(
    page: Page,
    minimumPrice: number
): Promise<string> {

    const minProductXPath =
        `//li[@class="product-base"]` +
        `[.//div[@class="product-price"]//span[` +
        `((contains(@class,"product-discountedPrice") or not(@class)) ` +
        `and normalize-space()="Rs. $ {minimumPrice}")]]` +
        `//h4[@class="product-product"]`;

    const productName = await page.locator(minProductXPath)
        .first()
        .textContent();

    return productName?.trim() || 'Product name not found';
}
