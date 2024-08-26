const express = require("express")
const app = express();
app.use(express.json())

const mockuser = [
  {name:"ace", email:"ace@gmail.com", username:"ace_01"},
  {name:"bob", email:"bob@gmail.com", username:"bob_01"},
  {name:"zack", email:"zack@gmail.com", username:"zack_01"}
]

app.get("/", (req,res) =>{
  console.log(req.params)
  res.status(200).send(mockuser)
})

app.get("/api/user/:name", (req,res) =>{
  // const {name} = req.params;
  // if(!name) return res.status(400).send("Invalid Message")
  const a = mockuser.filter(item=> item.name && item.name === req.params.name);
  if(a.length) return res.status(200).send(a)
    return res.send("Invalid Request")
})

app.get("/api/user/index/:id", (req,res) =>{
  const index = parseInt(req.params.id);
  if(index <=0 || index>mockuser.length) return res.status(400).send({msg:"Invalid Message"})
  res.status(200).send(mockuser[index-1])
})

app.get("/api/user",(req,res)=>{
  // console.log(req.query)
  const {name, email} = req.query
  if(!name &&  !email) return res.status(400).send({msg:"Invalide Request"});
    const a = mockuser.filter(item => (item.name === name && item.email === email));
  if(!a.length) return res.status(400).send({msg:"No user found"})
    res.status(200).send(a)
})

// creating a new user
// app.post("/api/user", (req,res) => {
//   console.log(req.body)
//   res.send("user created")
// })

app.post("/api/user", (req, res) => {
  console.log(req.body)
  const { name, email, username } = req.body
  if (!name || !email || !username) return res.status(400).send({ msg: 'Bad request' });
  mockuser.push([req.body]);
  return res.status(200).send(mockuser)
})

//Deleting a user
// app.delete("/api/user/:id",(req,res)=>{
//   const index = parseInt(req.params.id)
//   if(index<0 || index>=mockuser.length) return res.status(400).send
//   ({msg:"Invalid"})
//   mockuser.splice(index,1)
//   res.status(200).send(mockuser)
// })

app.delete("/api/user/:name", (req, res) => {
  const name = req.params.name;
  const index = mockuser.findIndex(user => user.name === name);
  if (!name) {
    return res.status(400).send({ msg: "User not found" });
  }
  mockuser.splice(index, 1);
  res.status(200).send(mockuser);
});

app.put("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  mockuser[id] = req.body;
  if (id === -1) {
      return res.status(400).send({ msg: "Invalid ID" });
  }
  res.status(200).send({ msg: "User updated", users: mockuser })
  res.send("User updated")
})

// patch 
// app.patch("/api/user/:id",(req,res)=>{
//   const id = parseInt(req.params.id);
//   mockuser[id] = req.body;
//   // if (id === -1) {
//   //     return res.status(400).send({ msg: "Invalid ID" });
//   // }
//   res.status(200).send({ msg: "User updated", users: mockuser })
//   res.send("User updated")
// })

app.patch("/api/user/:id/:name",(req,res)=>{
  
  const idParam = parseInt(req.params.id, 10);
  if (req.body.name && req.body.name.length) {
      mockuser[idParam].name = req.body.name;
  }
  if (req.body.id && req.body.id.length) {
      mockuser[idParam].id = req.body.id;
  }
  if (req.body.email && req.body.email.length) {
      mockuser[idParam].email = req.body.email;
  }
  if (req.body.username && req.body.username.length) {
      mockuser[idParam].username = req.body.username;
  }
  res.status(200).send({msg:"user updated",users:mockuser})
})

app.listen(4000,()=>{
  console.log("Port running on 1343 port")
});
