const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://shopee.vn/search?keyword=tai-nghe%20bluetooth");

  const shopee = await page.evaluate(() => {
    let items = document.getElementsByTagName('script');
    var products = [];

    for (const item of items) {

      if (item.getAttribute('type')) {
        try {
          if (item.getAttribute('type') == 'application/ld+json') {
            try {
              var obj = JSON.parse(item.innerText);
              let product = {
                name : obj.name,
                price : obj.offers.price ? obj.offers.price : 0,
                lowPrice : obj.offers.lowPrice ? obj.offers.lowPrice : 0,
                highPrice : obj.offers.highPrice ? obj.offers.highPrice : 0
              }
              products.push(product);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return products;

  });
  console.log(shopee);

  await browser.close();
})();