import { Table } from 'crostab'

export class Er extends Error {
  constructor (name, message) {
    super()
    this.name = name
    this.message = message
  }

  static log (err) {
    err.name.tag(err.message) |> console.log
  }

  static logger (p) {
    return err => { String(p).tag(err.name).tag(err.message) |> console.log }
  }

  static info (err, showStack = false) {
    const { name, message } = err
    return showStack
      ? { valid: false, name, message, stack: err.static }
      : { valid: false, name, message }
  }

  static r ({
    name,
    message
  }) {
    return new Er(name || 'Error', message || '')
  }

  static tab (error, scope, message) {
    return new Table(['error', 'scope', 'message'], [[error, scope, message]], 'error')
  }

  static obs (error, scope, message) {
    return [{ error, scope, message }]
  }
}
