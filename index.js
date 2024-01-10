const { Console } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
////////////////////////////////////////
//FILES

//blokking, modo síncrono
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);

//const textOut = `This is what we know about avicado: ${textIn} \nCreated on ${Date.now()}`; // editar o texto de saída 
//fs.writeFileSync('./txt/output.txt', textOut); //cria um novo arquivo com o texto editado
//console.log('Fire Wireten!');

//no-blokking, modo assíncrono

// fs.readFile('./txt/start.txt','utf-8' , (_err, data1) => {
//   if(_err) return console.log('ERROR!!');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8' , (_err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8' , (_err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}` , 'utf-8',err => {
//                 console.log('arquivo criado');
//             });
//         });   
//     });
// });   
// console.log('leu aqui');
/////////////////////////////////////////
//SERVER


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);  

const server = http.createServer((req, res) => {   
    const {query, pathname} = url.parse(req.url, true);
 

//overview page
    if (pathname === '/' || pathname === '/overview') {        
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml); 
        res.end(output); 



//product page         
    } else if(pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
///api        
    } else if(pathname === '/api') {    
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
//not found         
    } else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
         res.end('<h1>Page not found</h1>');
    }
});
        
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on the port 8000');
})  
