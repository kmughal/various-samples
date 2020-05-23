const jsdom = require("jsdom")
const { JSDOM } = jsdom
const markup = `<!DOCTYPE html>

<html>
<body>
<h1 id="h1">Hello World</h1>
<button id="btn">Click</button>

<script>
const btn = document.getElementById("btn")
btn.addEventListener("click" , e => {
    document.getElementById("h1").innerHTML = "khurram"
},true)

</script>
</body>
</html>
`

function Test(markup) {
  const _self = this
  const _jsdom = new JSDOM(markup, { runScripts: "dangerously" })
  const _dom = _jsdom.window.document
  this.tell = (text, func) => {
    func(_self)
  }
  this.dom = _dom
  this.getById = (id) => _dom.getElementById(id)
  this.getTextById = (id) => _dom.getElementById(id).textContent
  this.fire = (id, eventName) => _dom.getElementById(id)[eventName]()

  this.assert = {
    shout(f) {
      f ? console.log(f, "success") : console.error(new Error(f), "fail")
    },
    equal(v1, v2) {
      this.shout(v1 === v2)
    },
    notEqual(v1,v2) {
        this.shout(v1 !== v2)
    },
    lessThan(v1,v2) {
         this.shout(v1 < v2)
    },
    lessOrEqual(v1,v2) {
        this.shout(v1 <= v2)
    },
    greater(v1,v2) {
        this.shout(v1 > v2)
    },
    greaterOrEqual(v1,v2) {
        this.shout(v1 >= v2)
    },
    isTrue(v1) {
        this.shout(v1 === true)
    },
    isFalse(v1) {
        this.shout(v1 === false)
    },
    isUndefined(v1) {
        this.shout(!v1)
    },
    isNotUndefined(v1) {
        this.shout(v1)
    },
    isObject(v1) {
        this.shout(v1 instanceof Object)
    },
    isArray(v1) {
        this.shout(Array.isArray(v1))
    },
    arrayHasNoNullValue(v1) {
        if (!Array.isArray(v1)) throw new Error("not array!")
        this.shout(v1.every(v=> v))
    },
    arrayHasNullValue(v1) {
        if (!Array.isArray(v1)) throw new Error("not array!")
        this.shout(v1.some(v => !v))
    }
  }
}

const myTest = new Test(markup)
// myTest.tell("fake test" , _ => {
//    const actual =  myTest.getTextById("h1")
//    const expected = "Hello World"
//    myTest.assert.equal(actual,expected)
// })

myTest.tell("another test", ({ fire, getTextById }) => {
  fire("btn", "click")
  console.log(getTextById("h1"))
})
myTest.tell("another test", ({ assert }) => {
  assert.arrayHasNoNullValue([1,2,3])
})
