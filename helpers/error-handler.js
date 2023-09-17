function ErrorHandler(err, req, res, next){

 // jwt Authorization error
 if(err === "UnauthorizedError") {
  return res.status(401).json({msg: "user is not authorized"})
 }

 // validation error
 if(err === "ValidationError") {
  return res.status(401).json({msg: err})
 }

 // default server error
 return res.status(500).json(err)
}

export default ErrorHandler