const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://tiki.vn/search?q=chuot%20logitech");

    const tiki = await page.evaluate(() => {
        let items = document.querySelectorAll(".product-item");
        let products = [];
        items.forEach((item) => {
            let data = {};
            try {
                data.name = item.querySelector('.name').innerHTML;
                data.price = item.querySelector('.price-discount > .price-discount__price').innerHTML;

            }
            catch (err) {
                console.log(err)
            }
            products.push(data);
        });
        return products;
    });

    console.log(tiki);
    await browser.close();
})();