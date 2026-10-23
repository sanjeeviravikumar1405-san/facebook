import { test, expect } from '@playwright/test';
test('launch Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');
//task1 total count of product
    const count= await page.locator('//li[@class="product-base"]').count();
    console.log('Total elements count:', count);


//task2 minimum price
    const prices = await page.locator('//li[@class="product-base"]/descendant::span[@class="product-discountedPrice"]').allTextContents();
    const amounts = prices
    .map(price => Number(price.replace(/[^\d]/g, '')))
    const minPrice = Math.min(...amounts)
    console.log('Minimum price: ₹' + minPrice);


    //task 3 product brand name 
 const minproductName = await page.locator(
        `span[@class="product-discountedPrice" and normalize-space()= 'Rs.450']/ancestor::div[@class="product-price"]/preceding-sibling::h4[@class="product-product"]`
).textContent();
console.log('Product brand:', minproductName?.trim());
})
//task 4 total value without discount price
   const count = await page.locator(
  "//div[@class='product-price']//span[@class='product-discountedPrice'] | //div[@class='product-price']/span[not(@class) and text()]"
).count();

console.log("Total price values:", count);