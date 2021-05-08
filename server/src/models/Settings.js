const joi = require("@hapi/joi");

const SettingsSchema = joi.object({
  theme: joi
    .object({
      backgroundColor: joi
        .string()
        .regex(/^#[a-f0-9]{3,6}$/i)
        .default("#151515")
    })
    .default({})
});

module.exports = { schema: SettingsSchema };
