
import { test, expect } from '@playwright/test';

test('Find minimum price and product name', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    const products = page.locator('//li[contains(@class,"product-base")]');
    await products.first().waitFor();

    const details = await products.evaluateAll(cards =>
        cards.map(card => {
            const priceElement =
                card.querySelector('span.product-discountedPrice') ||
                card.querySelector('span:not([class])');

            const priceText = priceElement?.textContent?.trim() || '';
            const price = Number(priceText.replace(/[^\d]/g, ''));

            return {
                price,
                priceText,
                name: card.querySelector('h4.product-product')?.textContent?.trim() || ''
            };
        })
    );

    const validProducts = details.filter(item => item.price > 0);
    const minimumPrice = Math.min(...validProducts.map(item => item.price));
    const minProduct = validProducts.find(item => item.price === minimumPrice);

    if (!minProduct) {
        throw new Error('Minimum-price product not found');
    }

    const minPriceXPath =
        `//li[contains(@class,"product-base")]` +
        `[.//div[contains(@class,"product-price")]` +
        `//span[(contains(@class,"product-discountedPrice") or not(@class))` +
        ` and normalize-space()="${minProduct.priceText}"]]`;

    const minCard = page.locator(minPriceXPath).first();
    const productName = await minCard.locator('xpath=.//h4[contains(@class,"product-product")]').textContent();

    console.log('Minimum Price:', minimumPrice);
    console.log('Product Name:', productName?.trim());

    expect(minimumPrice).toBeGreaterThan(0);
});
