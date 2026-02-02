import{test, expect} from '@playwright/test';
import { PDFParse } from 'pdf-parse';

test('PDF parser', async({})=> {

    const parser = new PDFParse({ url: 'https://www.princexml.com/samples/invoice-plain/index.pdf' });
    const result = await parser.getText();
    
    const invoiceRegex = /Invoice number:\s*(\d+)/;
    const match = result.text.match(invoiceRegex);
    console.log(match);

    expect(match[1]).toBe('161126');

});

// test('Download PDF', async({page})=> {

//     await page.goto('https://playground.bondaracademy.com/pages/extra-components/pdf-download');

//     const [download] = await Promise.all([
//         page.waitForEvent('download'),
//         await page.getByRole('button', {name: "Download PDF"}).click()
//     ])

//     // Create a Node.js buffer from the downloaded PDF
//     const buffer = await download.createReadStream();
//     const chunks = [];
//     for await (const chunk of buffer) {
//         chunks.push(chunk);
//     }
//     const pdfBuffer = Buffer.concat(chunks);

//     // Parse the PDF from buffer
//     const parser = new PDFParse({data: buffer});
//     const result = await parser.getText();
    
//     const invoiceRegex = /Invoice number:\s*(\d+)/;
//     const match = result.text.match(invoiceRegex);
//     expect(match[1]).toBe('161126');

// });