/**
 * 观察者模式
 */
class ObserverList {
  _observerList = []

  add(obj) {
    // 返回 _observerList 的新长度
    return this._observerList.push(obj)
  }

  empty() {
    this._observerList = []
  }

  count() {
    return this._observerList.length
  }

  get(index) {
    if (index > -1 && index < this._observerList.length) {
      return this._observerList[index]
    }
  }

  insert(obj, index) {
    let point = -1
    if (index > -1 && index <= this._observerList.length) {
      this._observerList.splice(index, 0, obj)
      point = index
    }
    return index
  }

  indexOf(obj, startIndex = 0) {
    return this._observerList.indexOf(obj, startIndex)
  }

  removeAt(index) {
    if (index > -1 && index < this._observerList.length) {
      this._observerList.splice(index, 1)
    }
  }
}

class Subject {
  _observers = new ObserverList()

  addObserver(observer) {
    this._observers.add(observer)
  }

  removeObserver(observer) {
    this._observers.removeAt(this._observers.indexOf(observer))
  }

  notify(context) {
    let l = this._observers.count()
    while (l--) {
      this._observers.get(l).update(context)
    }
  }
}

class Observer {
  constructor(update) {
    this.update = update
  }
}

/**
 * 发布订阅模式
 */
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
  Pubsub,
  Subject,
  Observer,
}