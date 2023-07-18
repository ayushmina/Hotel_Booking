const mongoose         = require("mongoose")
const config           = require("config")
function mongoConnect() {
  try {
    const url = config.get("db.databaseUrl")
    console.log("Url mongo:", url)
    mongoose.connect(
      url,{ useUnifiedTopology: true, useNewUrlParser: true }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}
exports.mongoConnect = mongoConnect
