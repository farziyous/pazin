import sharp from 'sharp';
import { readdirSync } from 'fs';
import path from 'path';

const dirs = [
  'src/assets/banners',
  'src/assets/collection-images',
];

for (const dir of dirs) {
  const files = readdirSync(dir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    console.log(`Converted: ${inputPath} → ${outputPath}`);
  }
}