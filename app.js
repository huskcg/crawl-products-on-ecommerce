const puppeteer = require("puppeteer");
const fs = require('fs');

var dir = './lyric';


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(".name_song");
    let links = [];
    items.forEach(item => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href")
      });
    });
    return links;
  });

  for (let song of songs) {
      await page.goto(song.url);
      let lyric = await page.evaluate(() => {
          let lyric = document.getElementsByClassName("pd_lyric trans")[0].innerHTML.replace(/\<br\>/g, "");
          return lyric;
      });
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
      await fs.writeFile(`lyric/${song.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")}.txt`, lyric, function(err) {
        if (err) throw err;
        console.log("Saved:" + song.title);
      });
  }
  
  await browser.close();
})();