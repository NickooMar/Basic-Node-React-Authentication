const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config() //Importante para que funcione la variable de entorno.

const app = express();

const mongooseUrl = process.env.MONGOOSE_API_KEY;

mongoose
  .connect(mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error(error));

app.listen(5000, () => {
  console.log("Server Running");
});

app.use(express.json());

app.post("/post", async (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  try {
    if (data === "nicoo") {
      res.status(200).send("Ok");
    } else {
      res.send({ status: "Error User not found" });
    }
  } catch (error) {
    res.status(400).send("Error");
  }
});


require('./userDetails')

const User = mongoose.model("UserInfo");

app.post('/register', async (req, res) => {
    
    const { name, email, phoneNo } = req.body;
    
    try {
        await User.create({
            name,
            email,
            phoneNo,
        });
        res.send({status: 'User created Successfully'})
    } catch (error) {
        res.send({status: 'Error'})
    }
})