import {Validator} from "./"

export const NAME_REGEX = /^[\w\d-_]{2,20}$/

export function validateName(name) {
  if(!NAME_REGEX.test(name))
    return Validator.fail("Try another username")

  return Validator.succeed();
}
