import { test, expect } from '@playwright/test';
test('File uploading',async({page})=>{
await page.locator('#uploadFile').setInputfiles("C:\Users\HP\Downloads\closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower.jpg")

})
test('upload multiple files',async({page})=>{
await page.goto("https://www.file.io/");
await page.setInputFiles('//input[@type="file"]'),("C:\Users\HP\Downloads\closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower.jpg"),("C:\Users\HP\Downloads\closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head.jpg")
await page.getByRole('button',{name:"validate and upload"}).click();
})