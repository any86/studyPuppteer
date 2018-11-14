const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const DIR_PATH  = './screenshot';
const rimraf = require('rimraf');
const fs = require('fs');
(async () => {
    rimraf.sync(DIR_PATH);
    fs.mkdirSync(DIR_PATH);
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        timeout: 3000,
    });

    const page = await browser.newPage();
    await page.emulate(iPhone);

    await page.goto('http://127.0.0.1:3000/#/en-US/product/KNL11');
    await page.waitFor('.atom-btn-group');
    await page.screenshot({
        path: `${DIR_PATH}/1.png`
    });
    await page.waitFor(1000);
    await page.tap('.atom-btn.atom-btn--primary');
    await page.waitFor(1000);
    await page.screenshot({
        path: `${DIR_PATH}/2.png`
    });

    await page.tap('.btns-edit>.flex-item');
    await page.waitFor(1000);
    await page.screenshot({
        path: `${DIR_PATH}/3.png`
    });
    
    await page.tap('.atom-mask svg');
    await page.type('.input__comp>.atom-input__input', 'Soufeel');
    await page.waitFor(1000);
    await page.screenshot({
        path: `${DIR_PATH}/4.png`
    });

    await page.tap('.atom-mask>.flex-row>svg');
    await page.waitFor(300);
    await page.screenshot({
        path: `${DIR_PATH}/5.png`
    });

    // 加入购物车
    await page.tap('.atom-btn-group>button');
    await page.waitFor(300);
    await page.screenshot({
        path: `${DIR_PATH}/6.png`
    });

    await browser.close();
})();