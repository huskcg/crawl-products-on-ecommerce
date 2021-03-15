const puppeteer = require("puppeteer");
const fs = require('fs');

var dir = './lyric';


(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  // await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");
  await page.goto("https://shopee.vn/search?keyword=tai-nghe%20bluetooth");

  const songs = await page.evaluate(() => {
    // debugger
    // let items = document.querySelectorAll(".name_song");
    let items = document.getElementsByTagName('script');
    var withProperty = [];
    // for (i = 0; i < items.length; i++) {
    //   if (items[i].getAttribute('data-rh') ) {
    //     try {
    //       if (items[i].getAttribute('data-rh')=='true') {
    //         withProperty.push(items[i]);
    //       }
    //     } catch (error) {

    //     }
    //   }

    for (const item of items) {

      if (item.getAttribute('type')) {
        try {
          if (item.getAttribute('type') == 'application/ld+json') {
            // debugger
            try {
              // debugger
              var obj = JSON.parse(item.innerText);
              let product = {
                name : obj.name,
                price : obj.offers.price ? obj.offers.price : 0,
                lowPrice : obj.offers.lowPrice ? obj.offers.lowPrice : 0,
                highPrice : obj.offers.highPrice ? obj.offers.highPrice : 0
              }
              withProperty.push(product);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    let links = [];
    // items.forEach(item => {
    //   links.push({
    //     title: item.innerText,
    //     url: item.getAttribute("href")
    //   });
    // });
    return withProperty;

  });
  console.log(songs);

  // for (let song of songs) {
  //     await page.goto(song.url);
  //     let lyric = await page.evaluate(() => {
  //         let lyric = document.getElementsByClassName("pd_lyric trans")[0].innerHTML.replace(/\<br\>/g, "");
  //         return lyric;
  //     });
  //     if (!fs.existsSync(dir)){
  //       fs.mkdirSync(dir);
  //   }
  //     await fs.writeFile(`lyric/${song.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")}.txt`, lyric, function(err) {
  //       if (err) throw err;
  //       console.log("Saved:" + song.title);
  //     });
  // }

  await browser.close();
})();