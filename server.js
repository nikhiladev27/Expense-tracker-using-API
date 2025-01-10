// const http = require("http");
// const modules = require('./modules');

// const server = http.createServer((req, res)=>{
//     res.writeHead(200,{"Content-type":"text/plain"});
//     res.write(`${modules.add(20,8)}\n`);
//     res.write(`${modules.sub(20,8)}\n`);
//     res.write(`${modules.multiply(20,8)}\n`);
//     res.write(`${modules.divide(20,8)}\n`);
//     res.end();
// })
// server.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })
// const modules = require('./modules');

// console.log(modules.add(20,8));
// console.log(modules.sub(20,8));
// console.log(modules.multiply(20,8));
// console.log(modules.divide(20,8));

//create a server which responds to the list of users in sample.json file
const http = require("http");
const fs = require ("fs");

const server = http.createServer((req, res)=>{
   // res.writeHead(200,{"Content-type":"text/plain"});
    fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return
    }
    console.log(JSON.parse(data));
    res.write(data);
    res.end();
    });
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})