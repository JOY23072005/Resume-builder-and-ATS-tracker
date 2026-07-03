import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { getBrowser } from "./browser.service.js";

export const generatePdf = async ({
    html,
    fileName
})=>{

    const browser = await getBrowser();

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "networkidle0",
        });

    const pdfDir = path.join(
        process.cwd(),
        "generated",
        "pdfs"
    );

    if (!fs.existsSync(pdfDir)) {

        fs.mkdirSync(
        pdfDir,
        {
            recursive: true,
        }
        );

    }

    const pdfPath = path.join(
        pdfDir,
        `${fileName}.pdf`
    );

    await page.pdf({
        path: pdfPath,

        format: "A4",

        printBackground: true,

        margin: {
            top: "15mm",
            bottom: "15mm",
            left: "15mm",
            right: "15mm",
        },

        preferCSSPageSize: true,
    });

    await page.close();

    return pdfPath;

};