const http = require('http');
const fs = require('fs');

http.get('http://localhost:3000/components', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('/home/abhajkhan/Code/personal-workspace/alpha-company/src/fetched-components.html', data);
    console.log("Successfully fetched components page!");
  });
}).on('error', (err) => {
  console.error("Error fetching components page:", err);
});
