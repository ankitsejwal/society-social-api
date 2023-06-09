const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const residentsSchema = new mongoose.Schema({
  firstName: { type: String, min: 3, max: 20, required: true },
  lastName: { type: String, min: 3, max: 20, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'prefer not to say'] },
  phone: { type: String, required: true },
  email: { type: String, required: true, min: 5, max: 30 },
  apartment: String,
  status: { type: String, required: true, enum: ['owner', 'tenant'] },
  nationality: { type: String, min: 3, max: 20 },
});

const Resident = mongoose.model('Resident', residentsSchema);

function validateResident({ body, id }) {
  const schema = {
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    dob: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'prefer not to say').required(),
    phone: Joi.string().length(10).required(),
    email: Joi.string().email().min(5).max(30),
    apartment: Joi.string(),
    status: Joi.string().valid('owner', 'tenant').required(),
    nationality: Joi.string().min(3).max(20).required(),
  };

  if (id && body) {
    schema.id = Joi.objectId();
    body.id = id;
  } else if (id) {
    schema = { id: Joi.objectId() };
    body = { id: id };
  }

  const residentsSchema = Joi.object(schema);
  return residentsSchema.validate(body);
}

module.exports = { Resident, validateResident };

// todo
// change dob type to Date
// think about country code and whatsapp no.
