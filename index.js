const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require("puppeteer");

//variaveis globais
var browser;
var page;

app.use(bodyParser.json())

app.post('/whatsapp/connect', async (req, res) => {

    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null, //Defaults to an 800x600 viewport
    });
    page = await browser.newPage();
    await page.goto("https://web.whatsapp.com", { waitUntil: 'networkidle0' });

    return res.json({ open: true })

});

app.post('/whatsapp/send/contacts', async (req, res) => {

    let message;

    for (let i = 0; i < req.body.messages.length; i++) {

        message = req.body.messages[i].message;

        for (let i = 0; i < req.body.contacts.length; i++) {

            let name = req.body.contacts[i].name;

            try {
                await page.click('._3FRCZ'); // clica no campo de pesquisa
                await page.waitFor(1000);
                await page.type('._3FRCZ', name); // digita o nome de contato
                await page.waitFor(100);

                await page.click('._210SC span[title="' + name + '"]'); // abre a conversar
                await page.waitFor(500);

                await page.type('._2FVVk._2UL8j', ' ' + message); // escreve a mensagem
                await page.waitFor(3000);

                page.click('._3e4VU'); // limpa o campo pesquisa

                await page.click('span[data-testid="send"]') // envia a mensagem
                await page.waitFor(100);
            } catch (err) {

            }

        }
    }

    return res.json({ send: true })

});

app.listen(3001)