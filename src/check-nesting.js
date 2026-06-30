const fs = require('fs');

const content = fs.readFileSync('/home/abhajkhan/Code/personal-workspace/alpha-company/src/fetched-components.html', 'utf8');

// Let's count how many `<div class="py-12 border-t border-divider-neutral first:border-t-0">` tags exist,
// and check if they are nested inside each other or are siblings.
// We can do this by keeping a stack of open tags.

let pos = 0;
let depth = 0;
const sections = [];

while (pos < content.length) {
  if (content.substring(pos, pos + 4) === '<div') {
    depth++;
    // Check if it is a DemoSection div by looking at class
    const endOfTag = content.indexOf('>', pos);
    const tagText = content.substring(pos, endOfTag);
    if (tagText.includes('py-12 border-t border-divider-neutral')) {
      sections.push({ type: 'start', depth: depth, pos: pos, tag: tagText });
    }
    pos = endOfTag + 1;
  } else if (content.substring(pos, pos + 5) === '</div') {
    // Check if we are closing a DemoSection
    const endOfTag = content.indexOf('>', pos);
    sections.push({ type: 'end', depth: depth, pos: pos });
    depth--;
    pos = endOfTag + 1;
  } else {
    pos++;
  }
}

console.log("Sections nesting trace:");
sections.forEach(s => {
  if (s.type === 'start') {
    console.log(`START: Depth ${s.depth} - ${s.tag.substring(0, 80)}...`);
  } else {
    console.log(`END  : Depth ${s.depth}`);
  }
});
