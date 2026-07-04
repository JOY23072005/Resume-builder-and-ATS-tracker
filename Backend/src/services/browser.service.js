import puppeteer from "puppeteer";

let browser = null;

export const getBrowser = async () => {

  if (browser)
    return browser;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
    ],
  });

  console.log("Browser Launched");

  return browser;

};

export const closeBrowser = async () => {

  if (browser) {

    await browser.close();

    browser = null;

  }

};