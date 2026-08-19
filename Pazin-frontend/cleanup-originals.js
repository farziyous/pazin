import { readdirSync, existsSync, unlinkSync } from 'fs';
import path from 'path';

const dirs = [
  'src/assets/banners',
  'src/assets/collection-images',
];

for (const dir of dirs) {
  const files = readdirSync(dir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const webpEquivalent = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    if (existsSync(webpEquivalent)) {
      const originalPath = path.join(dir, file);
      unlinkSync(originalPath);
      console.log(`Deleted: ${originalPath}`);
    }
  }
}