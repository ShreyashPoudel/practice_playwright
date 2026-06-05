import fs from 'fs';
import path from 'path';


export class VideoUpload {
  constructor(page) {
    this.page = page;
  }

  async uploadRandomVideo() {
    const videosDir = path.resolve(__dirname, '../videos');

    const videos = fs
      .readdirSync(videosDir)
      .filter(f => /\.(mp4|webm|ogg)$/i.test(f));

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoPath = path.join(videosDir, randomVideo);

    await this.page.locator('text=Add video tutorial').click();
    await this.page.locator('input[type="file"]').first().setInputFiles(videoPath);
     }
}