const mongoose = require('mongoose')


const userDetailsSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        phoneNo: String, 
    }, { 
        collection: "UserInfo"
    }
)


mongoose.model("UserInfo", userDetailsSchema)

module.exports