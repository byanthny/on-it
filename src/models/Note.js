const joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { convert } = require("joigoose")(mongoose);
const nanoid = require("nanoid");

const ID = () => "nid_" + nanoid(28);

const NoteSchema = joi.object({
  uid: joi
    .string()
    .length(parseInt(process.env.ID_LENG) + 4)
    .regex(/^uid_/),
  parent: joi
    .string()
    .length(parseInt(process.env.ID_LENG) + 4)
    .regex(/^tid_/),
  nid: joi.string().default(ID),
  title: joi
    .string()
    .max(255)
    .default(() => `${Date.now()} Note`),
  text: joi
    .string()
    .max(5120)
    .min(1),
  tags: joi
    .array()
    .items(joi.string())
    .default([]),
  createdAt: joi.date().default(Date.now),
  updatedAt: joi.date().default(Date.now)
});

const NoteMongooseSchema = new mongoose.Schema(convert(NoteSchema));

const NoteModel = mongoose.model("Note", NoteMongooseSchema);

NoteModel.on(/update/i, async function() {
  this.updatedAt = Date.now();
});

module.exports = { schema: NoteSchema, model: NoteModel };
