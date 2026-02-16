#!/usr/bin/env python3
"""
Scrape sõiduõppe.ee WordPress site
Extract all content, iframes, images, and teooria.ee integrations
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json
import re
import os
from pathlib import Path
import time
from typing import Set, Dict, List

# Configuration
BASE_URL = "https://www.xn--siduppe-10ad.ee/"  # IDN: sõiduõppe.ee
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images"
MANIFEST_PATH = Path(__file__).parent / "manifest.json"

# Track visited URLs to avoid duplicates
visited_urls: Set[str] = set()
scraped_data: Dict[str, any] = {
    "site_info": {
        "name": "Sõiduõppe ABC",
        "domain": "sõiduõppe.ee",
        "scraped_at": None
    },
    "pages": [],
    "images": [],
    "teooria_integrations": [],
    "external_links": []
}

def get_headers():
    """Return headers to simulate a real browser"""
    return {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'et,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }

def is_internal_url(url: str) -> bool:
    """Check if URL is internal to the site"""
    parsed = urlparse(url)
    base_parsed = urlparse(BASE_URL)
    return parsed.netloc in ['', base_parsed.netloc, 'xn--siduppe-10ad.ee', 'www.xn--siduppe-10ad.ee']

def is_teooria_url(url: str) -> bool:
    """Check if URL is teooria.ee related"""
    return 'teooria.ee' in url.lower()

def clean_text(text: str) -> str:
    """Clean and normalize text content"""
    if not text:
        return ""
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_price(text: str) -> List[str]:
    """Extract price information from text"""
    # Look for prices like "123€", "123 €", "123 eurot"
    prices = re.findall(r'\d+[.,]?\d*\s*(?:€|eurot?|eur)', text, re.IGNORECASE)
    return [p.strip() for p in prices]

def extract_course_code(url: str, text: str) -> str:
    """Extract course code like B-ABC7483"""
    # Try URL first
    match = re.search(r'/([A-Z]{1,2}-ABC\d+)/', url)
    if match:
        return match.group(1)

    # Try text content
    match = re.search(r'\b([A-Z]{1,2}-ABC\d+)\b', text)
    if match:
        return match.group(1)

    return None

def download_image(img_url: str, page_url: str) -> str:
    """Download image and return local path"""
    try:
        # Make URL absolute
        img_url = urljoin(page_url, img_url)

        # Skip data URIs
        if img_url.startswith('data:'):
            return None

        # Get filename
        parsed = urlparse(img_url)
        filename = os.path.basename(parsed.path)

        # Skip if no filename
        if not filename or '.' not in filename:
            return None

        # Create output directory
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

        # Download
        response = requests.get(img_url, headers=get_headers(), timeout=10)
        if response.status_code == 200:
            filepath = OUTPUT_DIR / filename
            with open(filepath, 'wb') as f:
                f.write(response.content)

            # Return relative path for manifest
            return f"/images/{filename}"

    except Exception as e:
        print(f"Error downloading image {img_url}: {e}")

    return None

def scrape_page(url: str, depth: int = 0, max_depth: int = 3) -> None:
    """Scrape a single page and extract all relevant information"""

    # Skip if already visited or too deep
    if url in visited_urls or depth > max_depth:
        return

    visited_urls.add(url)
    print(f"{'  ' * depth}Scraping: {url}")

    try:
        response = requests.get(url, headers=get_headers(), timeout=15)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract page data
        page_data = {
            "url": url,
            "path": urlparse(url).path,
            "title": soup.title.string if soup.title else "",
            "meta_description": "",
            "headings": {},
            "content": [],
            "images": [],
            "iframes": [],
            "external_links": [],
            "course_code": None,
            "prices": []
        }

        # Meta description
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            page_data['meta_description'] = clean_text(meta_desc['content'])

        # Extract headings
        for tag in ['h1', 'h2', 'h3', 'h4']:
            headings = soup.find_all(tag)
            if headings:
                page_data['headings'][tag] = [clean_text(h.get_text()) for h in headings]

        # Extract main content
        # Look for common WordPress content areas
        content_areas = soup.find_all(['article', 'main', '.content', '.entry-content', '.post-content'])
        if not content_areas:
            # Fallback to body
            content_areas = [soup.body] if soup.body else []

        for area in content_areas:
            if area:
                # Get all paragraphs
                paragraphs = area.find_all('p')
                for p in paragraphs:
                    text = clean_text(p.get_text())
                    if text and len(text) > 10:  # Skip very short text
                        page_data['content'].append(text)

                # Get list items
                lists = area.find_all(['ul', 'ol'])
                for lst in lists:
                    items = [clean_text(li.get_text()) for li in lst.find_all('li')]
                    if items:
                        page_data['content'].extend(items)

        # Extract all text for price and course code detection
        full_text = soup.get_text()
        page_data['prices'] = extract_price(full_text)
        page_data['course_code'] = extract_course_code(url, full_text)

        # Extract images
        for img in soup.find_all('img'):
            img_src = img.get('src')
            if img_src:
                img_data = {
                    "src": urljoin(url, img_src),
                    "alt": img.get('alt', ''),
                    "title": img.get('title', ''),
                    "local_path": None
                }

                # Download image
                local_path = download_image(img_src, url)
                if local_path:
                    img_data['local_path'] = local_path
                    scraped_data['images'].append(img_data)

                page_data['images'].append(img_data)

        # Extract iframes (CRITICAL for teooria.ee)
        for iframe in soup.find_all('iframe'):
            iframe_src = iframe.get('src')
            if iframe_src:
                iframe_data = {
                    "src": urljoin(url, iframe_src),
                    "page_url": url,
                    "width": iframe.get('width', ''),
                    "height": iframe.get('height', ''),
                    "title": iframe.get('title', ''),
                    "is_teooria": is_teooria_url(iframe_src)
                }

                page_data['iframes'].append(iframe_data)

                # Track teooria.ee integrations separately
                if iframe_data['is_teooria']:
                    scraped_data['teooria_integrations'].append({
                        "iframe_url": iframe_src,
                        "found_on_page": url,
                        "course_code": page_data['course_code']
                    })

        # Extract external links
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            full_url = urljoin(url, href)

            # Check if teooria.ee link
            if is_teooria_url(full_url):
                link_data = {
                    "url": full_url,
                    "text": clean_text(link.get_text()),
                    "page_url": url,
                    "is_teooria": True
                }
                page_data['external_links'].append(link_data)
                scraped_data['external_links'].append(link_data)

                # Track as teooria integration
                scraped_data['teooria_integrations'].append({
                    "link_url": full_url,
                    "link_text": link_data['text'],
                    "found_on_page": url,
                    "course_code": page_data['course_code']
                })

            # Crawl internal links
            elif is_internal_url(full_url) and not any(skip in full_url for skip in ['#', 'javascript:', 'mailto:', '.pdf', '.jpg', '.png', '/wp-admin', '/wp-content', '/feed']):
                # Normalize URL
                full_url = full_url.split('#')[0].split('?')[0].rstrip('/')

                # Recursively scrape
                time.sleep(0.5)  # Be polite
                scrape_page(full_url, depth + 1, max_depth)

        # Add page to manifest
        scraped_data['pages'].append(page_data)

    except Exception as e:
        print(f"Error scraping {url}: {e}")

def main():
    """Main scraping function"""
    print("Starting WordPress site scrape...")
    print(f"Base URL: {BASE_URL}")
    print("=" * 60)

    # Start scraping from homepage
    scrape_page(BASE_URL)

    # Update timestamp
    from datetime import datetime
    scraped_data['site_info']['scraped_at'] = datetime.now().isoformat()
    scraped_data['site_info']['total_pages'] = len(scraped_data['pages'])
    scraped_data['site_info']['total_images'] = len(scraped_data['images'])
    scraped_data['site_info']['teooria_integrations_found'] = len(scraped_data['teooria_integrations'])

    # Save manifest
    print("=" * 60)
    print(f"Scraping complete!")
    print(f"Pages scraped: {len(scraped_data['pages'])}")
    print(f"Images downloaded: {len(scraped_data['images'])}")
    print(f"Teooria.ee integrations found: {len(scraped_data['teooria_integrations'])}")
    print(f"External links found: {len(scraped_data['external_links'])}")

    # Save to JSON
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(scraped_data, f, ensure_ascii=False, indent=2)

    print(f"\nManifest saved to: {MANIFEST_PATH}")

    # Print teooria.ee integrations for review
    if scraped_data['teooria_integrations']:
        print("\n" + "=" * 60)
        print("TEOORIA.EE INTEGRATIONS FOUND:")
        print("=" * 60)
        for i, integration in enumerate(scraped_data['teooria_integrations'], 1):
            print(f"\n{i}. Course: {integration.get('course_code', 'N/A')}")
            print(f"   Page: {integration.get('found_on_page', 'N/A')}")
            if 'iframe_url' in integration:
                print(f"   Iframe: {integration['iframe_url']}")
            if 'link_url' in integration:
                print(f"   Link: {integration['link_url']} ({integration.get('link_text', '')})")

if __name__ == "__main__":
    main()
