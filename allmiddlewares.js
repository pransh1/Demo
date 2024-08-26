function auth(res,req,next){
  console.log("Authenticating..");
  let error = new Error();
  error.message = "Its an error";
  next(error);
}

function validator(res,req,next){
  console.log("Validating..");
  next();
}

module.exports = {auth,validator}