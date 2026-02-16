#!/usr/bin/env node
/**
 * Generate course markdown files from manifest.json
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MANIFEST_PATH = path.join(__dirname, 'manifest.json');
const COURSES_DIR = path.join(__dirname, '..', 'src', 'content', 'courses');

// Category info
const CATEGORIES = {
  'A': { name: 'A-kategooria (Mootorratas)', slug: 'a-kategooria' },
  'AM': { name: 'AM-kategooria (Mopeed)', slug: 'am-kategooria' },
  'B': { name: 'B-kategooria (Sõiduauto)', slug: 'b-kategooria' },
  'BE': { name: 'BE-kategooria (Sõiduauto haagisega)', slug: 'be-kategooria' },
  'C': { name: 'C-kategooria (Veoauto)', slug: 'c-kategooria' },
  'CE': { name: 'CE-kategooria (Veoauto haagisega)', slug: 'ce-kategooria' },
  'D': { name: 'D-kategooria (Buss)', slug: 'd-kategooria' },
  'X': { name: 'Libedasõit', slug: 'libedakolitus' }
};

function extractCourseInfo(page, integration) {
  const courseCode = integration.course_code || 'Unknown';
  const category = courseCode.split('-')[0] || 'X';
  const categoryInfo = CATEGORIES[category] || { name: 'Muu', slug: 'muu' };

  // Extract content from page
  const title = page.headings?.h1?.[0] || `${courseCode} kursus`;
  const description = page.content?.join('\n\n') || '';

  // Extract price
  const priceMatch = page.prices?.[0] || '';

  return {
    courseCode,
    category,
    categoryName: categoryInfo.name,
    categorySlug: categoryInfo.slug,
    title,
    description,
    price: priceMatch,
    teooriaIframeUrl: integration.iframe_url,
    pageUrl: integration.found_on_page
  };
}

function generateMarkdown(courseInfo) {
  const slug = courseInfo.courseCode.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    slug,
    content: `---
title: "${courseInfo.title}"
courseCode: "${courseInfo.courseCode}"
category: "${courseInfo.category}"
categoryName: "${courseInfo.categoryName}"
description: "${courseInfo.description.substring(0, 200).replace(/"/g, '\\"')}..."
price: "${courseInfo.price}"
teooriaIframeUrl: "${courseInfo.teooriaIframeUrl}"
isFeatured: false
---

${courseInfo.description}

## Registreerimine

Registreeru kursusele allpool oleva vormi kaudu.
`
  };
}

async function main() {
  console.log('Generating course content from manifest...');
  console.log('='.repeat(60));

  // Read manifest
  const manifestData = await fs.readFile(MANIFEST_PATH, 'utf-8');
  const manifest = JSON.parse(manifestData);

  // Create courses directory
  await fs.mkdir(COURSES_DIR, { recursive: true });

  // Group integrations by course code
  const courseMap = new Map();

  for (const integration of manifest.teooria_integrations) {
    const courseCode = integration.course_code;
    if (!courseCode || courseCode === 'None') continue;

    if (!courseMap.has(courseCode)) {
      // Find the page for this course
      const page = manifest.pages.find(p => p.url === integration.found_on_page);
      if (page) {
        const courseInfo = extractCourseInfo(page, integration);
        courseMap.set(courseCode, courseInfo);
      }
    }
  }

  console.log(`Found ${courseMap.size} unique courses`);

  // Generate markdown files
  let created = 0;
  for (const [courseCode, courseInfo] of courseMap.entries()) {
    const { slug, content } = generateMarkdown(courseInfo);
    const filePath = path.join(COURSES_DIR, `${slug}.md`);

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✅ Created: ${slug}.md (${courseInfo.category})`);
    created++;
  }

  console.log('='.repeat(60));
  console.log(`✅ Generated ${created} course files`);

  // Summary by category
  const categoryCounts = {};
  for (const courseInfo of courseMap.values()) {
    categoryCounts[courseInfo.category] = (categoryCounts[courseInfo.category] || 0) + 1;
  }

  console.log('\nCourses by category:');
  for (const [cat, count] of Object.entries(categoryCounts).sort()) {
    console.log(`  ${cat}: ${count} courses`);
  }
}

main().catch(console.error);
