const _ = require("highland")

_([1, 2, 3, 4, 6]).toArray(console.log)

const fs = require("fs")
const fileReader = _.wrapCallback(fs.readFile)

_(fs.readdirSync(__dirname))
  .map(fileReader)
  .parallel(4)
  .each((c) => console.log(c.toString()))
