const joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { convert } = require("joigoose")(mongoose);
const nanoid = require("nanoid");

const ID = () => "uid_" + nanoid(28);

const UserSchema = joi.object({
  uid: joi.string().default(ID),
  email: joi
    .string()
    .email()
    .max(255)
    .required()
    .meta({ _mongoose: { unique: true } }),
  name: joi
    .object({
      first: joi.string().max(255),
      last: joi.string().max(255),
      display: joi
        .string()
        .min(3)
        .max(50)
    })
    .default({}),
  createdAt: joi.date().default(Date.now),
  updatedAt: joi.date().default(Date.now)
});

const UserMongooseSchema = new mongoose.Schema(convert(UserSchema));

const UserModel = mongoose.model("User", UserMongooseSchema);

UserModel.on(/update/i, async function() {
  this.updatedAt = Date.now();
});

module.exports = { schema: UserSchema, model: UserModel };
