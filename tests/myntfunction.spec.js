
import { test, expect, Locator, Page } from '@playwright/test';

test('Find minimum price and product name in Myntra', async ({ page }) => {

    await page.goto('https://www.myntra.com/boy-tshirts');

    const products = page.locator('//li[contains(@class,"product-base")]');

    await products.first().waitFor();

    console.log('Total products:', await products.count());

    const productDetails = await getAllProductDetails(products);

    const validProducts = productDetails.filter(product => product.price > 0);

    if (validProducts.length === 0) {
        throw new Error('No valid product prices found');
    }

    const minimumProduct = validProducts.reduce((minimum, product) =>
        product.price < minimum.price ? product : minimum
    );

    const minimumPrice = minimumProduct.price;
    const minimumPriceText = minimumProduct.priceText;

    console.log('Minimum Price: Rs.', minimumPrice);

    const minimumProductXPath =
        `//li[contains(@class,"product-base")]` +
        `//div[contains(@class,"product-price")]/span[` +
        `(contains(@class,"product-discountedPrice")` +
        ` and normalize-space(.)=" {minimumPriceText}")` +
        ` or (not(@class) and normalize-space(.)=" {minimumPriceText}")]` +
        `/ancestor::li[contains(@class,"product-base")]`;

    const minimumCard = page.locator(minimumProductXPath).first();

    const productName = await getProductName(minimumCard);
    const brandName = await getProductBrand(minimumCard);

    console.log('Minimum price product name:', productName);
    console.log('Brand name:', brandName);

    expect(minimumPrice).toBeGreaterThan(0);
    expect(productName).not.toBe('');
});

async function getAllProductDetails(
    products: Locator
): Promise<{ price: number; priceText: string }[]> {

    return await products.evaluateAll(cards =>
        cards.map(card => {

            const discountedPrice = card.querySelector(
                'div.product-price span.product-discountedPrice'
            );

            const regularPrice = card.querySelector(
                'div.product-price span:not([class])'
            );

            const priceElement = discountedPrice ?? regularPrice;
            const priceText = priceElement?.textContent?.trim() ?? '';

            const match = priceText.match(/(?:Rs\.?|₹)\s*([\d,]+)/i);

            return {
                price: match
                    ? Number(match[1].replace(/,/g, ''))
                    : 0,
                priceText
            };
        })
    );
}

async function getProductName(product: Locator): Promise<string> {

    const nameXPath =
        './/h4[contains(@class,"product-product")]';

    return (await product.locator(`xpath=${nameXPath}`).textContent())?.trim() ?? '';
}

async function getProductBrand(product: Locator): Promise<string> {

    const brandXPath =
        './/h3[contains(@class,"product-brand")]';

    return (await product.locator(`xpath=${brandXPath}`).textContent())?.trim() ?? '';
}
