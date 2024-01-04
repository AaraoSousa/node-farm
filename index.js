const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);


const textOut = `This is what we know about avicado: ${textIn} \nCreated on ${Date.now()}`; // editar o texto de saída 
fs.writeFileSync('./txt/output.txt', textOut); //cria um novo arquivo com o texto editado
console.log('Fire Wireten!');
