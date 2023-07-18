const universalFunctions                     = require("../utils/universalFunctions")
const models                                 = require("./../Models/index");
const responseMessages                       = require("../resources/response.json");
const config                                 = require("config");
// const {jwtAppTokenGenerator}                 = require("../../utils/JwtFunctions");
const Joi                                    = require("joi");
const Boom                                   = require("boom");
// const {sendEmail}                            = require("../../services/MailServices/emailServicesSMTP");
const {createaccessToken}                    = require("../Services/sessionmanger");
let curd={


signinUser : async function (req, res) {
    try {
    
      const schema = Joi.object().keys({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
      })      
      console.log("payload", req.body)
      await universalFunctions.validateRequestPayload(req.body, res, schema)
      let payload = req.body;

      let userInfo = await models.userSchema.findOne({
        email: payload.email
      })
      if (!userInfo) {
        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: responseMessages.USER_NOT_FOUND,
          },
          res
        )
      } else {

        if (!userInfo.authenticate(req.body.password)) {
          throw Boom.badRequest("Authentication failed Passwords did not match")
        }
        
        let tokenn = {
          userId: userInfo._id,
        };
        
        let token = await createaccessToken(tokenn);


     let user = {
          token:token,
          _id: userInfo._id,
          name: userInfo.username,
          email: userInfo.email,
          isAdmin:userInfo.isAdmin,
        }
  
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "SIGNIN_SUCCESS",
            data: user,
          },
          res
        )
      }
    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  }  ,
  signup :async function (req, res) {
    try {
   
      let payload = req.body
      console.log("payload", payload)
      let userExists = await models.userSchema.findOne({
        email: payload.email,
      })
      if (userExists) {
        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: "responseMessages  ALREADYEXIST",
          },
          res
        )
      } else {
        const schema = Joi.object().keys({
          username: Joi.string().trim().required(),
          country:Joi.string().trim().required(),
          email: Joi.string().email().required(),
          city:Joi.string().required(),
          phone:Joi.string().required(),
          img:Joi.string().required(),
          password: Joi.string().required(),
       
          
        })
        await universalFunctions.validateRequestPayload(req.body, res, schema)

        let payload=req.body;

        let userInfo = await models.userSchema.create(payload);
        let tokenn = {
          userId: userInfo._id,
          deviceType: payload.deviceType,
        };
        let token = await createaccessToken(tokenn);
        // console.log(token,"token:123")
        //  token =await  jwtAppTokenGenerator(userInfo._id,payload.deviceType,payload.deviceToken);  

  
        let user = {
          _id: userInfo._id,
          email: userInfo.email,
          name: userInfo.username,
          token:token,        
        }
  
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "USER_CREATED_SUCCESSFULLY",
            
            data: user,
          },
          res
        )
      }
    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  },
  updateUser: async function (req, res) {
    try {


        let user = await models.userSchema.find({ _id: req.params.id });

        if (!user) {
            return universalFunctions.sendError(
                {
                    statusCode: 400,
                    message: "user not present in system ",
                },
                res
            )}

        user = await models.userSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "user is update Successfull",
                data: user,
            },
            res
        )
    }
    catch (error) {
        return universalFunctions.sendError(error, res)
    }
},
deleteUser: async function (req, res) {
    try {


        let user = await models.userSchema.find({ _id: req.params.id });

        if (!user) {
            return universalFunctions.sendError(
                {
                    statusCode: 400,
                    message: "user not present in system ",
                },
                res
            )}

        user = await models.userSchema.findByIdAndDelete(req.params.id);
        return universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "user is delete Successfull",
                data: user,
            },
            res
        )
    }
    catch (error) {
        return universalFunctions.sendError(error, res)
    }
},
getUser: async function (req, res) {
    try {
        user = await models.userSchema.find(req.params);
        return universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "user is delete Successfull",
                data: user,
            },
            res
        )
    }
    catch (error) {
        return universalFunctions.sendError(error, res)
    }
},
}
module.exports = curd;
