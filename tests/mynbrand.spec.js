import { test } from '@playwright/test';

test('brand of minimum price product', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

   
    await page.locator('li.product-base').first().waitFor();

    const brands = await page.locator('h3.product-brand').allTextContents();
    const prices = await page.locator('span.product-discountedPrice').allTextContents();

    const products = prices.map((price, i) => ({
        brand: brands[i],
        price: Number(price.replace(/[^\d]/g, ''))
    }));

    products.sort((a, b) => a.price - b.price);

    console.log('Minimum price: ₹' + products[0].price);
    console.log('Brand name: ' + products[0].brand);
});