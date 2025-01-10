const fs = require('fs');
fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return
    }
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.filter((user)=>user.amount>=2000);

    fs.writeFile('./sample2.json',JSON.stringify(filteredData),(err)=>{
        if(err){
            console.log("Cannot write file");
            return
        }
        console.log("File written successfully");
    })

})