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
    .default([]),
  createdAt: joi.date().default(Date.now),
  updatedAt: joi.date().default(Date.now)
});

const UserMongooseSchema = new mongoose.Schema(convert(UserSchema));

const UserModel = mongoose.model("User", UserMongooseSchema);

UserModel.on(/update/i, async function() {
  this.updatedAt = Date.now();
});

module.exports = { schema: UserSchema, model: UserModel };
