const fs = require("fs");

const ndjson = require("ndjson");
const path = require("path");

fs.createReadStream(path.resolve(__dirname, "data.txt"))
  .pipe(ndjson.parse())
  .on("data", function (data) {
    console.log({ data });
    // obj is a javascript object
  });

const { Transform, Writable } = require("stream");
const through2 = require("through2");

class TransformSample extends Transform {
    
  _transform(chunk, encoding, callback) {
    const ch = chunk.toString("utf8").replace("khurram", "K.H.U.R.R.A.M.");
    this.push(ch);
    callback();
  }
}

const ts = new TransformSample();
const wd = new Writable();
wd._write = (chunk, encoding, next) => {
  console.log(chunk.toString("utf8"));
  next();
};

fs.createReadStream("transform.txt", { highWaterMark: 250 })
  .pipe(ts)
  .pipe(fs.createWriteStream("out.txt"));
