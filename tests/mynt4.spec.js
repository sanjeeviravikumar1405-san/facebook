
import { test, expect } from '@playwright/test';

test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    // Task 1: Total count of products
    const count = await page.locator('//li[@class="product-base"]').count();
    console.log('Total elements count:', count);

    // Task 2: Minimum price
    const prices = await page.locator(
        '//div[@class="product-price"]//span[@class="product-discountedPrice"] or//span[not(@class) and text()]'
    ).allTextContents();

    const amounts = prices
        .map(price => Number(price.replace(/[^\d]/g, '')))
        .filter(price => price > 0);

    const minPrice = Math.min(...amounts);
    console.log('Minimum price: ₹' + minPrice);


    // Task 4: Total price values (discount + non-discount)
    const validProducts = details.filter(item => item.price > 0);
    expect(validProducts.length).toBeGreaterThan(0);

    const minimumPrice = Math.min(...validProducts.map(item => item.price));

    console.log('Minimum price: ₹' + minimumPrice);

    // 4. Your XPath corrected to find the product name
    const minProductName = await page.locator(
        `//li[contains(@class,"product-base")]` +
        `[.//div[contains(@class,"product-price")]//span[` +
        `((contains(@class,"product-discountedPrice") or not(@class)) ` +
        `and normalize-space()="Rs. $ {minimumPrice}")]]` +
        `//h4[contains(@class,"product-product")]`
    ).first().textContent();

    console.log('Product name:', minProductName?.trim()); 

});



    







console.log('Total price values:', priceCount);



console.log('Product name:', minProductName?.trim());

});
