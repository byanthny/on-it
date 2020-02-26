const joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { convert } = require("joigoose")(mongoose);
const { schema: SettingsSchema } = require("./Settings");
const { schema: ProjectSchema } = require("./Project");

const UserSchema = joi.object({
  uid: joi.string().required(),
  settings: SettingsSchema.default({}),
  projects: joi
    .array()
    .items(ProjectSchema)
    .max(255)
    .default([])
});

const UserMongooseSchema = new mongoose.Schema(convert(UserSchema));

const UserModel = mongoose.model("User", UserMongooseSchema);

module.exports = { schema: UserSchema, model: UserModel };
