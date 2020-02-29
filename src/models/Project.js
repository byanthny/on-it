const joi = require("@hapi/joi");

const ProjectSchema = joi.object({
  name: joi
    .string()
    .regex(/^[a-z0-9\-_]{1,60}$/i)
    .required(),
  color: joi
    .string()
    .regex(/^#[a-f0-9]{3,6}$/i)
    .default("#333333"),
  createdAt: joi.date().default(Date.now)
});

module.exports = { schema: ProjectSchema };
