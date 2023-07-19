const Jwt               = require("jsonwebtoken");
const Config            =require("config");
const responseMessage   =require("../resources/response.json");
const Boom              =require("boom");


const createToken = async (payloadData, time) => {
  
  return new Promise((resolve, reject) => {
    Jwt.sign(payloadData,"secretKey", (err, jwt) => {
      if (err) {
        reject(err);
      } else {
        resolve(jwt);
      }
    });
  });
};



const createaccessToken = async (tokenData, expireTime=1440) => {
  try {

    const accessToken = await createToken(tokenData, expireTime);
    
    if (accessToken) {
      return accessToken;
    } else {
      throw Boom.badRequest(responseMessage.DEFAULT);
    }
  } catch (error) {
    throw error;
  }
};




module.exports = {

  createaccessToken
  
};
