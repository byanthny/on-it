import Joi from "joi"

/** Returns the validated object or the primary error message */
export async function validate<T>(
  schema: { [k: string]: Joi.Schema },
  incoming: T,
  partial: boolean = false,
): Promise<T | string> {
  const { value, error } = await Joi.object(schema)
    .validateAsync(incoming, {
      stripUnknown: true,
      presence: partial ? "optional" : undefined,
    })
  return value || error.message
}