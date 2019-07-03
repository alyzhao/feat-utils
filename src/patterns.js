class Pubsub {
  _topics = {}
  _subUid = -1

  publish (topic, args) {
    if (!this._topics[topic]) {
      return false
    }

    let subscribers = this._topics[topic]
    let len = subscribers.length
    while(len--) {
      subscribers[len].func(topic, args)
    }
    return this
  }

  subscribe (topic, func) {
    if (!this._topics[topic]) {
      this._topics[topic] = []
    }
    let token = (++this._subUid).toString()
    this._topics[topic].push({
      token,
      func
    })
    return token
  }

  unsubscribe (token) {
    let topicKeys = Object.keys(this._topics)
    let len = topicKeys.length
    while (len--) {
      let key = topicKeys[len]
      let handlerIndex = this._topics[key].findIndex(handler => handler.token === token)
      if (handlerIndex > -1) {
        this._topics[key].splice(handlerIndex, 1)
        return token
      }
    }
    return this
  }
}

export {
  Pubsub
}