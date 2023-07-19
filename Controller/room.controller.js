let universalFunctions = require("../utils/universalFunctions");
let Joi = require("joi");
let models = require("../Models/index");



let curd = {


    createRoom: async function (req, res) {
        try {

            const schema = Joi.object().keys({
                title: Joi.string().trim().required(),
                price: Joi.number().trim().required(),
                maxPeople: Joi.number().trim().required(),
                desc: Joi.string().trim().required(),
                roomNumbers: Joi.number().trim().required()
            })
            const hotelId = req.params.hotelid;
            
            await universalFunctions.validateRequestPayload(req.body, res, schema)

            let  newRoom = await models.Room.create(req.body);
            
            let room =await models.Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: newRoom._id },
              });
              if(!room){
                await models.Room.findByIdAndDelete(newRoom._id);
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "hotel is not found",
                    },
                    res
                )}

            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "room add Successfull",
                    data: newRoom,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    getRoomById: async function (req, res) {
        try {

            let hotel = await models.Room.findOne({ _id: req.params.id });
            if (!hotel) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "wrong id please try again with correct id",
                    },
                    res
                )}

                
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: " hotel detail get Successfull",
                    data: hotel,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    getHotels: async function (req, res) {
        try {

           let hotels = await models.Hotel.find()
                
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: " get hotels detail  Successfull",
                    data: hotels,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    updateRoom: async function (req, res) {
        try {


            let room = await models.Room.find({ _id: req.params.id });

            if (!room) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "hotel not present in system ",
                    },
                    res
                )}

            hotel = await models.Room.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "room is update Successfull",
                    data: hotel,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    deleteRoom : async function (req, res) {
        try {


            let room = await models.Room.find({ _id: req.params.id });

            if (!room) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "room not present in system ",
                    },
                    res
                )}

                await models.Room.findByIdAndDelete(req.params.id);
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "room is delete Successfull",
                    data: room,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    updateRoomAvailability: async function (req, res) {
        try {

            await Room.updateOne(
                { "roomNumbers._id": req.params.id },
                {
                  $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                  },
                }
              );
              return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "unavailableDates",
                    data: room,
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


