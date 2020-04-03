const fs = require('fs');

const text = fs.readFileSync('ksiega.txt','utf8');
console.log(text);

const para = document.getElementById('para');
para.innerText = text;