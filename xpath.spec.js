import {test} from '@playwright/test'

test('launch Myntra'),async({page})=>{
 await page.goto('https://www.myntra.com/boy-tshirts');

 const count = await page.locator('//li[@class = "product-base"]').count();
 console.log('Total elements count:',count);
 



}