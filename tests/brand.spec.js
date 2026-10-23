
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    await page.locator('//li[contains(@class,"product-base")]').first().waitFor();

    const products = await page.locator('//li[contains(@class,"product-base")]').all();

    const productDetails = (await Promise.all(
        products.map(async (product) => {
            const brand = await product.locator('xpath=.//h3[contains(@class,"product-brand")]').textContent();

            const priceText = await product.locator('xpath=.//span[contains(@class,"product-discountedPrice")]').textContent().catch(() => null);

            return {
                brand: brand?.trim() || '',
                price: priceText ? Number(priceText.replace(/[^\d]/g, '')) : 0
            };
        })
    )).filter(p => p.price > 0 && p.brand);

    console.log('Total products:', products.length);

    if (productDetails.length === 0) {
        console.log('No valid discounted products found');
        return;
    }

    const minProduct = productDetails.reduce((min, p) =>
        p.price < min.price ? p : min
    );

    console.log('Minimum price: ₹' + minProduct.price);
    console.log('Brand name: ' + minProduct.brand);

});
