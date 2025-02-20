import express from "express";
//import mongoose from "mongoose"
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
const MongoDBURI=process.env.MongoDBURI;

//connect to mongodb
try{
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("connected to MongoDB");
} catch(error){
    console.log("Error",error);
}


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})