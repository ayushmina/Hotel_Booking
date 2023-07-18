const Mongoose = require("mongoose")
const crypto = require("crypto")
const { number } = require("joi")

const HotelSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref:"room",
}],
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = Mongoose.model("Hotel", HotelSchema)
