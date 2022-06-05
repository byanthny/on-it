import Joi from "joi"

/** Returns the validated object or the primary error message */
export function validate<T>(
  schema: { [k: string]: Joi.Schema },
  incoming: T,
  partial: boolean = false,
): { result?: T, error?: string } {
  const { value, error } = Joi.object(schema)
    .validate(incoming, {
      stripUnknown: true,
      presence: partial ? "optional" : undefined,
    })
  return { result: value, error: error?.message }
}
