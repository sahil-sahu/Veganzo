const Joi = require('joi');

// Define the schema for validation
const schema = Joi.object({
  userID: Joi.string().required(),
  cart: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
        name: Joi.string().required(),
        category: Joi.object().required(),
        type: Joi.string().required()
      })
    )
    .required(),
  paymentMode: Joi.string().valid('upi').required(),
  address: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.array()
      .items(Joi.number().required(), Joi.number().required())
      .length(2)
      .required(),
    id: Joi.string().required()
  }).required(),
  storeids: Joi.array().items(Joi.string().required()).required()
});

export default schema;