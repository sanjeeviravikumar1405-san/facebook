
import { test } from '@playwright/test';

test('Find maximum rating and Add to Cart', async ({ page }) => {

    await page.goto('https://www.amazon.in');

    // Step 1: Search iPhone 17 Pro
    await page.locator('#twotabsearchtextbox').fill('iPhone 17 Pro');
    await page.keyboard.press('Enter');

    // Step 2: Wait for search results
    await page.waitForSelector('//div[@data-component-type="s-search-result"]');

    // Step 3: Get iPhone 17 Pro product cards (exclude Pro Max)
    const products = page.locator(
        '//div[@data-component-type="s-search-result"][.//span[contains(text(),"iPhone 17 Pro") and not(contains(text(),"Pro Max"))]]'
    );

    const count = await products.count();
    let maxRating = 0;
    let maxProduct = null;

    // Step 4: Find the maximum rating
    for (let i = 0; i < count; i++) {
        const product = products.nth(i);

        const ratingText = await product.locator(
            'span.a-icon-alt'
        ).first().textContent().catch(() => '');

        const match = ratingText?.match(/\d+(\.\d+)?/);
        const rating = match ? Number(match[0]) : 0;

        if (rating > maxRating) {
            maxRating = rating;
            maxProduct = product;
        }
    }

    // Step 5: Print maximum rating
    if (maxProduct && maxRating > 0) {
        console.log('Maximum Rating:', maxRating);

        // Step 6: Find and click Add to Cart
        const addToCart = maxProduct.locator(
            'input[aria-label="Add to cart"], button:has-text("Add to cart")'
        );

        if (await addToCart.count() > 0) {
            await addToCart.first().click();
            console.log('Add to Cart clicked');
        } else {
            console.log('Add to Cart button not found in search result');
        }
    } else {
        console.log('No ratings found');
    }
});
