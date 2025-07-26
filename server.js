const app = require("./src/app.js");
require("dotenv").config()
const connectDB = require("./src/db/db")

connectDB()

app.listen(3000,()=>{
  console.log("Server is running on 3000");
})
