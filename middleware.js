require('dotenv').config();
const express = require("express");
const fs = require("fs/promises");
const {auth, validator} = require("./allmiddlewares")
const router = require("./router");
const app = express();

// app.use(express.urlencoded({extended:true}))
// app.use(async (req, res, next) => {
//   const log = `${Date.now()} from ${req.method} ${req.url} with data: ${JSON.stringify(req.body)}\n`;
//   await fs.writeFile("Logger.txt", log, { flag: "a" });
//   console.log(req.body);
//   next();
// });

// // if we add a url in .use , its valid only for that url
// app.use((req,res,next) => {
//   req.newKey ="Its a key";
//   next();
// })

// // built in middlewares
// app.use(express.json())
// app.use("/app",express.static("Public"));

// app.use("/get",(req,res,next) => {
//   console.log("Processsing...");
//   next();
// })

// app.use((req,res,next) => {
//   // console.log("Processsing... again");
//   // next();
//   res.send("Not processing further...")
// })

// app.get("/get",(req,res,next) => {
//   console.log("Processsing...");
//   next();
// },(req,res,next) => {
//   console.log("Processsing... again");
//   next();
//   // res.send("Not processing further...")
// },(req,res) => {
//   console.log("Get")
//   res.send("Get response");
// });

app.use(express.json())

app.use("/api",router);

app.get("/get",auth,validator,(req,res)=>{
  res.send("Get request");
})

app.post("/post", (req,res) => {
  // console.log(req.body)
  res.send("this is post")
})

// error handeling middleware
app.use((err,req,res,next)=>{
  console.log(err);
  res.send(err);
})

app.listen(process.env.PORT, (req,res) => {
  console.log("server starting on port 4000");
});