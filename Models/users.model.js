const Mongoose = require("mongoose")
const crypto = require("crypto")
const { number } = require("joi")

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    
    },
    country: {
      type: String,
     
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }, 
    salt: {
        type: String,
      },
  
  },
  { timestamps: true }
);
UserSchema.pre("save", function (next) {
  if (this.password && this.password.length > 0) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64")
    this.password = this.hashPassword(this.password)
  }
  next()
})

UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
      .toString("base64")
  } else {
    console.log("hashPassword", password)
    return password
  }
}

UserSchema.methods.authenticate = function (password) {
  console.log("password", this.password === this.hashPassword(password))

  return this.password === this.hashPassword(password)
}
module.exports = Mongoose.model("user", UserSchema)
