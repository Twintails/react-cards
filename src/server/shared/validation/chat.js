import { Validator } from './'

export const MESSAGE_LENGTH_LIMIT = 240

export function validateMessage(message) {
  if(message.length > MESSAGE_LENGTH_LIMIT)
    return Validator.fail(`Message must be fewer than ${MESSAGE_LENGTH_LIMIT} characters long`)

  return Validator.succeed()
}
