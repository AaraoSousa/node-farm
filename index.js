const fs = require('fs');

//blokking, modo síncrono
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);

//const textOut = `This is what we know about avicado: ${textIn} \nCreated on ${Date.now()}`; // editar o texto de saída 
//fs.writeFileSync('./txt/output.txt', textOut); //cria um novo arquivo com o texto editado
//console.log('Fire Wireten!');

//no-blokking, modo assíncrono

fs.readFile('./txt/start.txt','utf-8' , (_err, data1) => {
  if(_err) return console.log('ERROR!!');
    fs.readFile(`./txt/${data1}.txt`,'utf-8' , (_err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8' , (_err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}` , 'utf-8',err => {
                console.log('arquivo criado');
            });
        });   
    });
});   
console.log('leu aqui');