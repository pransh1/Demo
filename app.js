const express = require("express");
const path = require("path")
const fs = require("fs/promises");
const qs = require("querystring");
const { read } = require("fs");
const app = express();

app.use("/Public/",express.static("Public"))
app.use(express.urlencoded({extended:true}))

app.get("/Public", (req,res) => {
  res.sendFile(path.join(__dirname,'/Public/index.html'));

})

// app.post("/userRegistered", async (req, res) => {
//   try {
//     const log = `${Date.now()} from ${req.method} ${req.url} with data: ${JSON.stringify(req.body)}\n`;
//     await fs.writeFile("Logger.txt", log, { flag: "a" });
//     // Log form data for debugging
//     console.log(req.body); // req.body will contain parsed form data
//     let readData = await fs.readFile("db.json", "utf8");
//     readData = JSON.parse(readData);
//     readData.push(req.body);
//     await fs.writeFile("db.json", JSON.stringify(readData, null, 2), "utf8");
//     // res.json(readData);
//     res.send("Data Recieved")

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/userRegister", async (req, res) => {
  try {
    let readData = await fs.readFile("db.json", "utf8");
    readData = JSON.parse(readData);
    const a = readData.filter(item=> item.name[0]==="a")
    console.log(a);
    res.send(a);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// app.put("/api/user/:id",(req,res)=>{
//   const idParam = parseInt(req.params.id, 10);
//   mockusers[idParam]=req.body;
//   res.status(200).send({msg:"user updated",users:mockusers})
// })

app.listen(8000,() =>{
  console.log("Running on 8000 port")
})