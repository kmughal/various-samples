const fs = require("fs")
const elasticlunr = require("elasticlunr")
const jsonFile = JSON.parse(
  fs
    .readFileSync(require("path").resolve(__dirname, "data", "fake-data.json"))
    .toString()
)

const index = elasticlunr(function () {
  this.addField("age")
  this.setRef("_id")
  this.addField("eyeColor")
  this.addField("name_first")
  this.addField("name_last")
  this.addField("address")
  this.saveDocument(false)
})

var mem = {}

jsonFile.forEach((v) => {
  mem[v._id] = v
  v.name_first = v.name.first
  v.name_last = v.name.last
  index.addDoc(v)
})

const r = index.search("Massey", {})

for (let i of r) {
  const item = mem[i.ref]
  console.log({ name: item.name, age: item.age, eyeColor: item.eyeColor })
}
