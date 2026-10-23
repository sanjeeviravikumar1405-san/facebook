import {test} from "@playwright/test";
test ('handling frames',async({page})=>{
await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/#iframe');
const frame = page.frameLocator('//[@name="globalsqa"]');
await frame.getByText('JMeter Training').click();
await page.getByRole('link',{name:'Drag And Drop'}).click();
await page.waitForTimeout(3000);

})