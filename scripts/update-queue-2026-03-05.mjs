import { readFileSync, writeFileSync } from 'fs';

// Read and strip BOM if present
let content = readFileSync('investor-browser-queue.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}

const queue = JSON.parse(content);

// IDs to remove (processed)
const processedIds = [
  '4KlEv3sJc5CHuW5raDDk', // Jon Oringer - flagged
  '5aWK1brhbtpKQxuyRHxt', // Sports Innovation VC - flagged  
  '6A6c4IGpcXSTkXnh2389', // Ethan Levy - flagged
  '6NLyUWaIVUUk4jL3ue1o', // Matt Mullenweg - researched
  '6VessfkSuCFYFCZLRMpS', // Negative Five - researched
  '6WEUpA8RYCgF1HaP2sUI'  // Kishen Patel - researched
];

const newQueue = queue.filter(inv => !processedIds.includes(inv.id));

writeFileSync('investor-browser-queue.json', JSON.stringify(newQueue, null, 2));
console.log(`Removed ${queue.length - newQueue.length} processed investors`);
console.log(`Remaining in queue: ${newQueue.length}`);
