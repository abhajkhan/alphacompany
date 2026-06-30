const fs = require('fs');

const content = fs.readFileSync('/home/abhajkhan/Code/personal-workspace/alpha-company/src/app/components/_ComponentsPage.tsx', 'utf8');

// A very simple tag balance parser that ignores strings/comments
let pos = 0;
const tags = [];
const selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link', 'Avatar', 'TextInput', 'TextArea', 'SelectInput', 'CheckboxField', 'Accordion', 'Tabs', 'Pagination', 'Breadcrumb', 'ServiceCard', 'ProductCard', 'InsightCard', 'TestimonialCard', 'PricingCard', 'TeamCard', 'Timeline', 'TechnologyGrid', 'EmptyState', 'Newsletter', 'ContactForm', 'CTABanner', 'Spinner', 'SkeletonCard', 'Inbox', 'X', 'Menu', 'ArrowLeft', 'ArrowRight', 'Badge', 'Chip'];

while (pos < content.length) {
  if (content.substring(pos, pos + 2) === '/*') {
    pos = content.indexOf('*/', pos + 2);
    if (pos === -1) break;
    pos += 2;
    continue;
  }
  if (content.substring(pos, pos + 2) === '//') {
    pos = content.indexOf('\n', pos + 2);
    if (pos === -1) break;
    pos += 1;
    continue;
  }
  if (content[pos] === '<') {
    // Check if comment
    if (content.substring(pos, pos + 4) === '<!--') {
      pos = content.indexOf('-->', pos + 4);
      if (pos === -1) break;
      pos += 3;
      continue;
    }
    // Tag
    let end = content.indexOf('>', pos);
    if (end === -1) break;
    let tagText = content.substring(pos + 1, end).trim();
    pos = end + 1;

    // Check if self-closing
    if (tagText.endsWith('/')) {
      continue;
    }

    let isClosing = tagText.startsWith('/');
    let tagName = isClosing ? tagText.substring(1).trim() : tagText.split(/\s+/)[0];

    // Remove any trailing component stuff
    if (tagName.endsWith('>')) tagName = tagName.slice(0, -1);

    if (selfClosing.includes(tagName)) {
      if (!isClosing) continue;
    }

    if (isClosing) {
      if (tags.length === 0) {
        console.log(`Extra closing tag: </${tagName}> at position around char ${pos}`);
      } else {
        let last = tags.pop();
        if (last.name !== tagName) {
          console.log(`Mismatched tag: opened <${last.name}> (char ${last.pos}), closed </${tagName}> (char ${pos})`);
        }
      }
    } else {
      tags.push({ name: tagName, pos: pos });
    }
    continue;
  }
  pos++;
}

console.log("Unclosed tags left:", tags);
