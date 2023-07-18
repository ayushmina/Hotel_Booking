const Mongoose = require("mongoose")
const crypto = require("crypto")
const { number } = require("joi")
const Schema = Mongoose.Schema
const userDataSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
    },
    deviceToken: {
      type: String,
    },
  
 
    salt: {
      type: String,
    },

  },

  { timestamps: true }
)

userDataSchema.pre("save", function (next) {
  if (this.password && this.password.length > 0) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64")
    this.password = this.hashPassword(this.password)
  }
  next()
})

userDataSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
      .toString("base64")
  } else {
    console.log("hashPassword", password)
    return password
  }
}

userDataSchema.methods.authenticate = function (password) {
  console.log("password", this.password === this.hashPassword(password))

  return this.password === this.hashPassword(password)
}
module.exports = Mongoose.model("user", userDataSchema)
