const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/assets');
const files = fs.readdirSync(dir).filter(f => f.startsWith('hero') && f.endsWith('.jpg'));

(async () => {
  console.log(`Found ${files.length} images to optimize.`);
  let totalSaved = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace('.jpg', '.webp'));
    
    const inputStats = fs.statSync(input);
    
    await sharp(input)
      .resize({ width: 800, withoutEnlargement: true }) // Downscale large images
      .webp({ quality: 75 }) // High quality WebP
      .toFile(output);
      
    const outputStats = fs.statSync(output);
    const saved = inputStats.size - outputStats.size;
    totalSaved += saved;
    
    console.log(`Converted ${file} to WebP. Saved ${(saved / 1024 / 1024).toFixed(2)} MB`);
  }
  
  console.log(`\nAll done! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
})();
