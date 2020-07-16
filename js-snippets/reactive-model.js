function getState(defaultValue = null) {
  const list = []

  function publish(_v) {
    for (const i in list) {
      if (Object.is(list[i].reference, _v)) {
        list[i].callback(_v.value)
        if (list[i].attachEvents) {
          for (let e in list[i].attachEvents) {
            document
              .getElementById(list[i].attachEvents[e].id)
              .addEventListener(
                list[i].attachEvents[e].event,
                list[i].attachEvents[e].method
              )
          }
        }
      }
    }
  }

  return new (function () {
    let _value = { value: defaultValue }

    function addSubscriber(markupFunc, el, attachEvents) {
      var sameref = false
      for (let i in list) {
        var f = Object.is(list[i].reference, _value)
        if (f) sameref = true
      }

      if (sameref) return
      list.push({
        reference: _value,
        callback: function (data) {
          const html = markupFunc(data)
          document.getElementById(el).innerHTML = html
        },
        attachEvents,
      })
    }
    function updater(value) {
      _value.value = value
      publish(_value)
    }
    return [_value, updater, addSubscriber]
  })()
}
