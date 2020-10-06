const puppeteer = require("puppeteer");

async function bot() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com", {waitUntil: 'networkidle0'});
    await page.waitFor(10000);

    await page.click('span[title="Eu"]');
    await page.waitFor(2000);

    await page.type('._2FVVk._2UL8j', 'Teste Bot');
    await page.waitFor(1000);

    await page.click('span[data-testid="send"]')
    await page.waitFor(1000);

    await browser.close();
}

bot();

module.exports.openWeb = async (req, res) => {
    return console.log("ok")
}