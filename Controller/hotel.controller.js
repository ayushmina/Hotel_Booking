let universalFunctions = require("../utils/universalFunctions");
let Joi = require("joi");
let models = require("../Models/index");

let curd = {


    addHotel: async function (req, res) {
        try {

            const schema = Joi.object().keys({
                name: Joi.string().trim().required(),
                type: Joi.string().trim().required(),
                city: Joi.string().trim().required(),
                address: Joi.string().trim().required(),
                distance: Joi.string().trim().required(),
                photos: Joi.array().trim().required(),
                title: Joi.string().trim().required(),
                desc: Joi.string().trim().required(),
                rating: Joi.number().required(),
                rooms: Joi.array().trim().required(),
                cheapestPrice: Joi.number().trim().required(),
                featured: Joi.bool().trim().required(),

            })

            await universalFunctions.validateRequestPayload(req.body, res, schema)

            let hotel = await models.Hotel.find(req.body);
            if (!category) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "hotel already added in system add other category",
                    },
                    res
                )
            }

            hotel = await models.Hotel.create(req.body);




            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "category add Successfull",
                    data: hotel,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    getHotelById: async function (req, res) {
        try {

            let hotel = await models.Hotel.findOne({ _id: req.params.id });
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

           const { min, max, ...others } = req.query;
           let hotels = await models.Hotel.find({
                ...others,
                cheapestPrice: { $gt: min | 1, $lt: max || 999 },
              }).limit(req.query.limit);
                
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
    updateHotel: async function (req, res) {
        try {


            let hotel = await models.Hotel.find({ _id: req.params.id });

            if (!hotel) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "hotel not present in system ",
                    },
                    res
                )}

            hotel = await models.Hotel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "hotel is update Successfull",
                    data: hotel,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    deleteHotel: async function (req, res) {
        try {


            let hotel = await models.Hotel.find({ _id: req.params.id });

            if (!hotel) {
                return universalFunctions.sendError(
                    {
                        statusCode: 400,
                        message: "hotel not present in system ",
                    },
                    res
                )}

                await models.Hotel.findByIdAndDelete(req.params.id);
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "hotel is delete Successfull",
                    data: hotel,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    },
    countByType: async function (req, res) {
        try {

            let types= ["hotel","apartment","resort","villa","cabin" ]
            const list = await Promise.all(
                types.map((type) => {
                  return models.Hotel.countDocuments({ type: type });
                })
              );
            return universalFunctions.sendSuccess(
                {
                    statusCode: 200,
                    message: "hotel is delete Successfull",
                    data: list,
                },
                res
            )
        }
        catch (error) {
            return universalFunctions.sendError(error, res)
        }
    }
}

module.exports = curd;


