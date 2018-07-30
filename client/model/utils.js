export function createError (code, message) {
  const err = new Error(message)
  err.code = code
  err.message = message
  return err
}