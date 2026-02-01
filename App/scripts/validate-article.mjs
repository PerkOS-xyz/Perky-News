#!/usr/bin/env node
/**
 * Validates article content before publishing
 * Checks for common LLM placeholder patterns and incomplete content
 */

import fs from 'fs';
import { fileURLToPath } from 'url';

// Patterns that indicate incomplete/placeholder content
const INVALID_PATTERNS = [
  // Incomplete statistics/numbers
  /\bover\s*\.\s/gi,                    // "processed over ."
  /\bmore than\s*\.\s/gi,               // "more than ."
  /\$\s*\.\s/gi,                        // "$ ."
  /\d+%\s*\.\s/gi,                      // "50% ."
  
  // Incomplete links/references
  /the\s+to\s+(get|learn|read|see)/gi,  // "Check out the to get started"
  /\[link\]/gi,                         // [link]
  /\[insert\s/gi,                       // [insert ...]
  /\[add\s/gi,                          // [add ...]
  /\[TODO\]/gi,                         // [TODO]
  /\[TBD\]/gi,                          // [TBD]
  
  // Empty bullet points
  /^[-*]\s*$/gm,                        // "- " (empty bullet)
  /^[-*]\s+\n/gm,                       // bullet with only whitespace
  
  // Placeholder text
  /\[placeholder\]/gi,
  /\[your\s+\w+\s+here\]/gi,            // [your name here]
  /lorem ipsum/gi,
  
  // Incomplete sentences
  /\.\s+\.\s/g,                         // ". ." (double period with gap)
  /,\s*\.\s/g,                          // ", ." (comma then period)
];

// Required sections for a valid article
const REQUIRED_CONTENT = {
  minLength: 500,                       // Minimum content length
  minParagraphs: 3,                     // At least 3 paragraphs
  minHeadings: 1,                       // At least one heading
};

function validateArticle(content) {
  const errors = [];
  const warnings = [];
  
  // Check for invalid patterns
  for (const pattern of INVALID_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      errors.push(`Found placeholder pattern: "${matches[0]}" (${pattern.source})`);
    }
  }
  
  // Check minimum content
  if (content.length < REQUIRED_CONTENT.minLength) {
    errors.push(`Content too short: ${content.length} chars (min: ${REQUIRED_CONTENT.minLength})`);
  }
  
  // Check paragraphs
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 50);
  if (paragraphs.length < REQUIRED_CONTENT.minParagraphs) {
    warnings.push(`Few paragraphs: ${paragraphs.length} (recommended: ${REQUIRED_CONTENT.minParagraphs}+)`);
  }
  
  // Check headings
  const headings = content.match(/^#+\s.+$/gm) || [];
  if (headings.length < REQUIRED_CONTENT.minHeadings) {
    warnings.push(`No headings found (recommended: ${REQUIRED_CONTENT.minHeadings}+)`);
  }
  
  // Check for empty sections
  const emptyListPattern = /^([-*]|\d+\.)\s*\n([-*]|\d+\.)\s*\n/gm;
  if (emptyListPattern.test(content)) {
    errors.push('Found empty list items (bullets/numbers with no content)');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// CLI usage
const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const input = process.argv[2];
  
  if (!input) {
    console.error('Usage: node validate-article.mjs <content-or-file>');
    console.error('       node validate-article.mjs article.md');
    console.error('       node validate-article.mjs "# My Article\\n\\nContent here"');
    process.exit(1);
  }
  
  let content;
  if (fs.existsSync(input)) {
    content = fs.readFileSync(input, 'utf8');
    console.log(`📄 Validating file: ${input}\n`);
  } else {
    content = input;
    console.log('📄 Validating inline content\n');
  }
  
  const result = validateArticle(content);
  
  if (result.errors.length > 0) {
    console.log('❌ ERRORS:');
    result.errors.forEach(e => console.log(`   - ${e}`));
  }
  
  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    result.warnings.forEach(w => console.log(`   - ${w}`));
  }
  
  if (result.valid) {
    console.log('\n✅ Article content is valid');
    process.exit(0);
  } else {
    console.log('\n❌ Article has validation errors - DO NOT PUBLISH');
    process.exit(1);
  }
}

export { validateArticle };
