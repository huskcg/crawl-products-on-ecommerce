const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://tiki.vn/search?q=chuot%20logitech");

    const tiki = await page.evaluate(() => {
        let items = document.querySelectorAll(".product-item .info .name");
        let products = [];
        for (const item of items) {
            products.push({
                // href: item.getAttribute("href")
                name: item.innerHTML
            })
        }
        return products;
    });

    console.log(tiki);
    await browser.close();
})();