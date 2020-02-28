const joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { convert } = require("joigoose")(mongoose);
const nanoid = require("nanoid");
const { TaskState } = require("../enum");
const ID_LENG = require("../config").ID_LENG;

const ID = () => "tid_" + nanoid(ID_LENG);

const TaskRoot = {
  parent: joi
    .string()
    .length(ID_LENG + 4)
    .regex(/^tid_/),
  text: joi
    .string()
    .min(1)
    .max(255)
    .required(),
  due: joi.date().default(null),
  reminders: joi
    .array()
    .items(joi.date())
    .default([]),
  state: joi
    .string()
    .lowercase()
    .allow(...Object.values(TaskState))
    .only()
    .default("todo"),
  pinned: joi.bool().default(false),
  tags: joi
    .array()
    .items(joi.string())
    .default([])
};

const TaskUpdateSchema = joi.object(TaskRoot);

const TaskSchema = joi.object({
  uid: joi.string().required(),
  tid: joi.string().default(ID),
  ...TaskRoot,
  createdAt: joi.date().default(Date.now),
  updatedAt: joi.date().default(Date.now)
});

const TaskMongooseSchema = new mongoose.Schema(convert(TaskSchema));

const TaskModel = mongoose.model("Task", TaskMongooseSchema);

TaskModel.on(/update/i, async function() {
  this.updatedAt = Date.now();
});

module.exports = {
  schema: TaskSchema,
  updateSchema: TaskUpdateSchema,
  model: TaskModel
};
