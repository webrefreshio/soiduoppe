#!/usr/bin/env node
/**
 * Compress and convert images to .webp format
 * Max width: 1200px, Quality: 80
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1200;
const QUALITY = 80;

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];

async function compressImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    // Skip SVG files (they're already optimized)
    if (ext === '.svg') {
      console.log(`⏭️  Skipping SVG: ${path.basename(inputPath)}`);
      return;
    }

    // Skip if already processed (output exists and is newer)
    try {
      const inputStat = await fs.stat(inputPath);
      const outputStat = await fs.stat(outputPath);
      if (outputStat.mtime > inputStat.mtime) {
        console.log(`⏭️  Already processed: ${path.basename(inputPath)}`);
        return;
      }
    } catch (e) {
      // Output doesn't exist, process it
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`📸 Processing: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);

    // Resize if width > MAX_WIDTH
    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const inputSize = (await fs.stat(inputPath)).size;
    const outputSize = (await fs.stat(outputPath)).size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    console.log(`   ✅ Saved as ${path.basename(outputPath)} (${(outputSize / 1024).toFixed(0)}KB, ${savings}% smaller)`);

    // Delete original
    await fs.unlink(inputPath);

  } catch (error) {
    console.error(`   ❌ Error processing ${path.basename(inputPath)}: ${error.message}`);
  }
}

async function processDirectory(dirPath) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const outputPath = filePath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

        // Skip if already .webp
        if (ext === '.webp') {
          // Still optimize it
          const tempPath = filePath + '.tmp';
          await compressImage(filePath, tempPath);
          await fs.rename(tempPath, filePath);
        } else {
          await compressImage(filePath, outputPath);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image compression...');
  console.log(`Directory: ${IMAGES_DIR}`);
  console.log(`Max width: ${MAX_WIDTH}px, Quality: ${QUALITY}`);
  console.log('=' .repeat(60));

  try {
    await processDirectory(IMAGES_DIR);
    console.log('=' .repeat(60));
    console.log('✅ Image compression complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
