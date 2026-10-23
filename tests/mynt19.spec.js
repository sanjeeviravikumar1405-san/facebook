import { test, expect, Page, Locator } from '@playwright/test';

// 1. Main test function
test('Find minimum price and product name', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    // 2. Product count
    const count = await getProductCount(page);
    console.log('Total products:', count);

    // 3. Get all product prices
    const products = page.locator('//li[contains(@class,"product-base")]');
    const prices = await getProductPrices(products);

    // 4. Find minimum price
    const minimumPrice = findMinimumPrice(prices);
    console.log('Minimum price: ₹' + minimumPrice);

    // 5. Dynamic XPath: discount OR regular price
    const minProductXPath =
        `//li[contains(@class,"product-base")]` +
        `[.//div[contains(@class,"product-price")]//span[` +
        `((contains(@class,"product-discountedPrice") or not(@class)) ` +
        `and normalize-space()="Rs. ${minimumPrice}")]]` +
        `//h4[contains(@class,"product-product")]`;

    // 6. Find product name
    const productName = await getProductName(page, minProductXPath);
    console.log('Product name:', productName);

    expect(minimumPrice).toBeGreaterThan(0);
});

// 7. Function with parameter and return type
async function getProductCount(page: Page): Promise<number> {
    return await page.locator('//li[contains(@class,"product-base")]').count();
}

// 8. Extract prices using DOM and map()
async function getProductPrices(products: Locator): Promise<number[]> {
    const priceTexts = await products.evaluateAll(cards =>
        cards.map(card => {
            const discount = card.querySelector('span.product-discountedPrice');
            const regular = card.querySelector('div.product-price > span:not([class])');
            return (discount || regular)?.textContent?.trim() || '';
        })
    );

    return priceTexts
        .map(price => Number(price.replace(/[^\d]/g, '')))
        .filter(price => price > 0);
}

// 9. Function to calculate minimum price
function findMinimumPrice(prices: number[]): number {
    if (prices.length === 0) {
        throw new Error('No valid prices found');
    }

    return Math.min(...prices);
}

// 10. Function chaining and XPath locator
async function getProductName(page: Page, xpath: string): Promise<string> {
    const name = await page.locator(xpath).first().textContent();
    return name?.trim() || 'Product name not found';
}