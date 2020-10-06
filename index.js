const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require("puppeteer");

//variaveis globais
var browser;
var page;

app.use(bodyParser.json())

app.post('/whatsapp/connect', async (req, res) => {

    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://web.whatsapp.com", { waitUntil: 'networkidle0' });

    return res.json({ open: true })

});

app.post('/whatsapp/send/contacts', async (req, res) => {

    let message = req.body.message;

    for (let i = 0; i < req.body.contacts.length; i++) {

        let name = req.body.contacts[i].name;

        await page.click('._3FRCZ');
        await page.waitFor(1000);
        await page.type('._3FRCZ', name);
        await page.waitFor(1000);
        await page.click('._3FRCZ');
        await page.waitFor(1000);

        await page.click('._210SC span[title="' + name + '"]');
        await page.waitFor(2000);

        await page.type('._2FVVk._2UL8j', ' '+message);
        await page.waitFor(3000);

        await page.click('span[data-testid="send"]')
        await page.waitFor(1000);

    }

    // await page.click('span[title="Eu"]');
    // await page.waitFor(2000);

    // await page.type('._2FVVk._2UL8j', ' teste Bot');
    // await page.waitFor(2000);

    // await page.click('span[data-testid="send"]')

    // await browser.close();

    return res.json({ send: true })

});

app.listen(3001)