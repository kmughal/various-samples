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

const createElement = (tagName) => (strings, ...args) => {
  const events = []
  const props = []
  for (let index in strings) {
    var part = String(strings[index]).replace("=", "").replace(" ", "")
    if (part.length === 0) continue
    part = String(part).toLocaleLowerCase()
    if (part.startsWith("on")) {
      events.push({ name: part.replace("on", ""), handler: args[index] })
    } else {
      props.push({ name: part, value: args[index] })
    }
  }

  return {
    type: tagName,
    events,
    props,
  }
}

function addNode(parentEl, component) {
  const ele = document.createElement(component.type)
  parentEl.appendChild(ele)
  for (let prop of component.props) {
    ele.setAttribute(prop.name, prop.value)
  }
  ele.textContent = component.props.filter((x) => x.name === "content")[0].value

  for (let event of component.events) {
    ele.addEventListener(event.name, event.handler)
  }
}

function clickHandler() {
  console.log("clicked")
}
var id = "id_btn"
const button = createElement("button")

var buttonParts = button`onClick=${clickHandler} id=${id} content=${"hello world"}`

var parentEl = document.getElementById("rhtml")

addNode(parentEl, buttonParts)
