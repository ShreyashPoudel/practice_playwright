import fs from 'fs';
import path from 'path';

export class ImageUpload {
  constructor(page) {
    this.page = page;
  }

  async uploadRandomImage() {
    const imagesDir = path.resolve(__dirname, '../images');

    const images = fs
      .readdirSync(imagesDir)
      .filter(f => /\.(png|jpe?g)$/i.test(f));

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = path.join(imagesDir, randomImage);

    await this.page.locator('text=Upload a cover image').click();
    await this.page.waitForSelector('input[type="file"]', { state: 'visible' });
    await this.page.locator('input[type="file"]').last().setInputFiles(imagePath);
     }
}

