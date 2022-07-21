const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


require("dotenv").config(); //Importante para que funcione la variable de entorno.

const app = express();

const mongooseUrl = process.env.MONGOOSE_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
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
app.use(cors());

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User already Exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "User created Successfully" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});


app.post('/login-user', async(req, res) => {

  const { email, password } = req?.body;

  const userExists = await User.findOne({email});

  if(!userExists) {
    return res.json({error: "User not found"});
  } 

  if(await bcrypt.compare(password, userExists.password)) {
    const token = jwt.sign({email: userExists.email}, JWT_SECRET);
    if(res.status(201)){
      return res.json({status: "ok", data: token})
    } else {
      return res.json({error: "error"})
    }
  }
  return res.json({status: "error", error: "Invalid Password"})
})



app.post("/userData", async(req, res) => {
  const { token } = req?.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    await User.findOne({email: userEmail}).then((data) => {
      res.send({status: "ok", data: data});
    }).catch((error) => res.send({status: "error", data: error}))

  } catch (error) {
    
  }

})
