// const fs = require('fs');
// // const path = './student.json'; 

// // const readJson = (path) => {
// //     const data = fs.readFile(path,'utf8',err(data));
// //      return JSON.parse(data);
    
// // }

// // const writeJson = (path) => {
// //    fs.writeFile(path,JSON.stringify(data),'utf8');
// // }

// // //if data present read and store as parse as json
// const create = (student)=>{
//     let students = []
//     fs.readFile('./student.json','utf8',(err)=>{
//         let store = data ? JSON.parse(data):[];
//         if(store.length>0){
//             students = [...store,student];
//         }
//         else{
//             students = student;
//         }
    
//         fs.writeFile('./student.json',JSON.stringyfy(students),'utf8',(err)=>{
//             if(err){
//                 console.log("Cannot write file");
//                 return
//             }
//             console.log("File written successfully");
//     })
//     });
// }

const fs =require('fs');
const create=(student)=>{
    let students=[]
    fs.readFile('./student.json','utf8',(err,data)=>{
        let ac=data? JSON.parse(data) : [];
        if(ac.length>0){
            students=[...ac,student]
        } else {
            students=[student]
        }
        fs.writeFile('./student.json',JSON.stringify(students),(err)=>{
            if(err){
                console.log("Error")
            }
            console.log("Data is added")
        });
    })
}
const read=()=>{
    fs.readFile('./student.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open file");
            return;
        }
        console.log(data);
    });
}
const update=(id,student)=>{
    fs.readFile('./student.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open file");
            return;
        }
        const jsonData=JSON.parse(data);
        const filterData=jsonData.filter((user)=>user.id!==id);
        filterData.push(student);
        fs.writeFile('./student.json',JSON.stringify(filterData),(err)=>{
            if(err){
                console.log("Error writing file")
                return
            }
            console.log("Data is updated")
        });
    });
}
const remove=(id)=>{
    fs.readFile('./student.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open file");
            return;
        }
        const jsonData=JSON.parse(data);
        const filterData=jsonData.filter((user)=>user.id!==id);
        fs.writeFile('./student.json',JSON.stringify(filterData),(err)=>{
            if(err){
                console.log("Error writing file")
                return
            }
            console.log("Data is removed")
        });
    });
}
create({id:100,name:"Sarah",age:19});
read();
// update(100,{id:100,name:"Sarah",age:20});
// read();
// remove(100);
