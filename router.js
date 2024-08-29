const express = require("express");
const router = express.Router();
const {auth,validator} = require("./allmiddlewares");
// router.use(express.json())
router.use((req,res,next)=>{
  console.log("This is nested middleware")
  next()
})
router.use(auth,validator,(req,res,next)=>{
  console.log("This is nested middleware pt2")
  next()
})

router.post("/router/post",(req,res)=>{
  console.log(req.body)
  res.send("Its a router post response")
})

router.delete("/router/delete",(req,res)=>{
  res.send("Its a router delete response")
})
router.put("/router/put",(req,res)=>{
  res.send("Its a router put response")
})
router.patch("/router/patch",(req,res)=>{
  res.send("Its a router patch response")
})

module.exports = router