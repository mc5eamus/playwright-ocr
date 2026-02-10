import Tesseract, { Worker, Block, Word } from 'tesseract.js';
import type { Page, Locator } from '@playwright/test';

let worker: Worker | null = null;

/**
 * Initialize the Tesseract OCR worker. Call once before tests
 * and reuse across all OCR operations for performance.
 */
export async function initOCR(): Promise<void> {
  if (worker) return;
  worker = await Tesseract.createWorker('eng');
}

/**
 * Shut down the Tesseract worker. Call after all tests complete.
 */
export async function teardownOCR(): Promise<void> {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
}

/**
 * Extract text from a raw image buffer using Tesseract OCR.
 */
export async function extractText(image: Buffer): Promise<string> {
  if (!worker) {
    throw new Error('OCR worker not initialized. Call initOCR() first.');
  }
  const { data } = await worker.recognize(image);
  return data.text;
}

/**
 * Take a screenshot of the full page and extract text via OCR.
 */
export async function extractTextFromPage(page: Page): Promise<string> {
  const screenshot = await page.screenshot();
  return extractText(screenshot);
}

/**
 * Take a screenshot of a specific element/locator and extract text via OCR.
 */
export async function extractTextFromLocator(locator: Locator): Promise<string> {
  const screenshot = await locator.screenshot();
  return extractText(screenshot);
}

/**
 * Extract structured blocks with paragraphs, lines, words, and bounding boxes.
 * Requires enabling the `blocks` output format in tesseract.js v7+.
 */
export async function extractBlocks(image: Buffer): Promise<Block[]> {
  if (!worker) {
    throw new Error('OCR worker not initialized. Call initOCR() first.');
  }
  const { data } = await worker.recognize(image, {}, { blocks: true });
  return data.blocks ?? [];
}

/**
 * Extract words with bounding boxes and confidence scores from an image.
 * Words are extracted from the nested blocks → paragraphs → lines → words structure.
 */
export async function extractWords(image: Buffer): Promise<Word[]> {
  const blocks = await extractBlocks(image);
  const words: Word[] = [];
  for (const block of blocks) {
    for (const paragraph of block.paragraphs) {
      for (const line of paragraph.lines) {
        words.push(...line.words);
      }
    }
  }
  return words;
}
