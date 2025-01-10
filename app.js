var express = require("express")
const mongoose = require("mongoose");
const {v4:uuidv4} = require("uuid");  //to generate unique id
const app = express();
app.use(express.json());  //middleware to parse the incoming request body

//creating a application for expense management, we use id,income,expense
mongoose.connect("mongodb://localhost:27017/expense").then(()=>{          //mongoose.connect returns a promise
    console.log("Connected to database");
});     

const expenseSchema = new mongoose.Schema({     //creating a schema
    id:{type:String, required:true, unique:true},  //unique:true means it should be unique checked by mongoose
    title:{type: String, required:true},        //required:true means it is mandatory
    amount:{type: Number, required:true},           
})
const Expenses = mongoose.model("Expenses",expenseSchema); //creating a model, why? to perform CRUD operations

app.get("/api/expenses",async(req,res)=>{   //to get all the expenses
    try{
    const expenses = await Expenses.find(); //to get all the expenses
    res.status(200).json(expenses);
    } catch(error){
        res.status(500).json({message:"failed to fetch expenses"});
    }
})

//write an api to get a single expense using id
app.get("/api/expenses/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const expense = await Expenses.findOne({id});
        if(!expense){
           return res.status(404).json({message:"Expense not found"});
        }
    
    res.status(200).json(expense);
   }catch(error){
    res.status(500).json({message:"Failed to fetch expense"});
}
})

app.post("/api/expenses",async(req,res)=>{
    console.log(req.body);
    const {title, amount} = req.body;
    try{
    const newExpense = new Expenses({
        id: uuidv4(),   //to generate unique id
        title:title,     //title:title why? because both are same why we use title, reason? because we are using destructuring
        amount: amount
    })
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
} catch(err){
    res.status(500).json({message:"Error in creating expense"});
}})

app.put("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params;
    const {title, amount} = req.body;
    try{
        const updatedExpense = await Expenses.findOneAndUpdate(
            {id},
            {title, amount},)
            if(!updatedExpense){
                return res.status(404).json({message:"Expense not found"});
            }
            res.status(200).json(updatedExpense);
    }
    catch(error){
        res.status(500).json({message:"Error in updating expense"});
    }
})

app.delete("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteExpense = await Expenses.findOneAndDelete({id});
        if(!deleteExpense){
            return res.status(404).json({message:"Expense not found"});
        }
        res.status(200).json(deleteExpense);
    }
    catch(error){
        res.status(500).json({message:"Error in deleting expense"});
    }
})


// const students=[{
//     name:"Nikhila",
//     age:20,
//     rollno:1
// },{
//     name:"Kalai",
//     age:25,
//     rollno:2
// },
// {
//     name:"Prisha",
//     age:25,
//     rollno:3
// }]
// app.get("/api/sayhello",(req,res)=>{
//     res.send("Hello World");
//     res.end();
// })
// app.get("/api/students",(req,res)=>{
//     res.status(200).json(students);
// })
// app.get("/api/students/:rollno",(req,res)=>{
//     const{rollno}=req.params;
//     const student=students.find((student)=>student.rollno==rollno);
//     if(!student){
//         res.status(404).send("Student not found");
//     }
//     else{
//         res.status(200).json(student);
//     }
// })
app.listen(3000,()=>{
     console.log("Server is running at port 3000");
 })