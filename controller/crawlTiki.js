const puppeteer = require("puppeteer");
const fs = require('fs');
const document_add = require("./document_add");

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://tiki.vn/search?q=m%C5%A9%20b%E1%BA%A3o%20hi%E1%BB%83m");
  // const url = "https://shopee.vn/search?keyword=tai-nghe%20bluetooth";

  
  // for (i = 0; i < 1; i++) {
  //   if (i == 0) {
  //     await page.goto(url);
  //     // console.log(url);
  //   }
  //   else {
  //     await page.goto(url + '&page='+ i);
  //     console.log(url + '&page=' + i);
      
  //   }
  // }
  const tiki = await page.evaluate(() => {
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
                url : obj.url,
                image : obj.image,

                price : obj.offers.price ? obj.offers.price : 0,
                lowPrice : obj.offers.lowPrice ? obj.offers.lowPrice : 0,
                highPrice : obj.offers.highPrice ? obj.offers.highPrice : 0,
                priceCurrency : obj.offers.priceCurrency ? obj.offers.priceCurrency : 0,

                bestRating : obj.aggregateRating.bestRating ? obj.aggregateRating.bestRating : 0,
                worstRating : obj.aggregateRating.worstRating ? obj.aggregateRating.worstRating : 0,
                ratingCount : obj.aggregateRating.ratingCount ? obj.aggregateRating.ratingCount : 0,
                ratingValue : obj.aggregateRating.ratingValue ? obj.aggregateRating.ratingValue : 0
              }
              products.push(product);
              // console.log(product);
              
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
  document_add.addDocument(tiki)
  // console.log('page:' + i + '=' + shopee.length);
  console.log(tiki);
  
  await browser.close();
})();