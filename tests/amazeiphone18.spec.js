import { test } from '@playwright/test';

test('Add highest-rated iPhone 17 Pro to cart', async ({ page }) => {

    await page.goto('https://www.amazon.in/', {
        waitUntil: 'domcontentloaded'
    });

    await page.locator('#twotabsearchtextbox').fill('iPhone 17 Pro');
    await page.locator('#twotabsearchtextbox').press('Enter');

    const productNameXPath =
        '//span[contains(text(),"iPhone 17 Pro ")]';

    const productRatingXPath =
        productNameXPath +
        '/ancestor::div[@data-cy="title-recipe"]' +
        '/following-sibling::div[@data-cy="reviews-block"]' +
        '/child::div/span[contains(@class,"a-size-small")]';

    await page.locator(productRatingXPath).first().waitFor({
        state: 'visible',
        timeout: 20000
    });

    const ratingTexts = await page.locator(productRatingXPath).allTextContents();

    const ratings = ratingTexts.map(r => Number(r))
 
    console.log(ratings)

    const maxRating = Math.max(...ratings);

    console.log('Maximum rating:', maxRating);


 await page.locator(`//span[contains(text(),"iPhone 17 Pro") and not(contains(text(),"Pro Max"))]/ancestor::div[@data-cy="title-recipe"]/following-sibling::div[@data-cy="reviews-block"]/descendant::span[contains(@class,"a-size-small") and text()="${maxRating.toFixed(1)}"]/ancestor::div[@role="listitem"]/descendant::input[@aria-label="Add to cart"]`).first().click();
});