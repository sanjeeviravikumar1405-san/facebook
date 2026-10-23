
import { test, expect } from '@playwright/test';
// Main test
test('Find minimum price and product details', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    const count = await page.locator(
        '//li[contains(@class,"product-base")]'
    ).count();
]console.log(count)
    // Function 1: Get minimum price
    async function getMinimumPrice() {

        const prices = await page.locator(
            '//div[@class="product-price"]//span[@class="product-discountedPrice"] | //div[@class="product-price"]/span[not(@class) and text()]'
        ).allTextContents();

        const amounts = prices
            .map(price => Number(price.replace(/[^\d]/g, '')))


        const minimumPrice = Math.min(...amounts);

        console.log('minimum price:', minimumPrice)

        const productName = await getProductDetails(minimumPrice);
        console.log(productName)

    }
    // Function 2: Get product details using minimum price
    async function getProductDetails(minPrice) {
        const productName = await page.locator(`//li[@class="product-base"]//div[@class="product-price"]//span[(@class="product-discounted price" and normalize-space()="Rs. ${minPrice}") or{not(@class)
 and normalize-space()="Rs.  ${minPrice})]]/ancestor::li[@class="product-base"]//h4[@class="product-product"]`).first().textContent();

        return productName;
    }
    await getMinimumPrice()
});
