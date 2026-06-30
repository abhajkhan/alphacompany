const fs = require('fs');

const content = fs.readFileSync('/home/abhajkhan/Code/personal-workspace/alpha-company/src/fetched-components.html', 'utf8');

const buttonsIdx = content.indexOf('Buttons');
if (buttonsIdx !== -1) {
  // Let's print the 1000 characters before the "Buttons" text to find the main container tag
  console.log(content.substring(buttonsIdx - 1000, buttonsIdx));
}
