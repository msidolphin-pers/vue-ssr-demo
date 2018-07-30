function Emitter () {
  this.events = {}
}

Emitter.prototype.on = (eventName, callback) => {
  if (this.eventName && typeof callback === 'function') {
    this.events.eventName = callback
  }
}

Emitter.prototype.emit = (eventName, args) => {
  if (eventName && typeof this.events[eventName] === 'function') {
    this.events[eventName](args)
  }
}

module.exports = Emitter
