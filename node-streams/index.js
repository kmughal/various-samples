const { Stream } = require("stream");
const readableStream = new Stream.Readable();

function* generator() {
  yield 1;
  yield 2;
  yield new Date().toString();
}

let readable = Stream.Readable.from(generator());

readable.on("data", console.log);

/*
    Streams comes in two flavours
    1. InFlow mode : means automatically read and provided to the application
    2. paused mode:  means that you have to explicitly call stream.read()

	All Readable streams starts in Pause mode.
	Once data event handler is added it switches to flow stream.
	Calling stream.resume() to resume 
	Calling stream.pipe() to send data to a writable.

	streams can be switched back to pausable mode by calling stream.pause()

*/

const fs = require("fs");

InflowModeExample();

function InflowModeExample() {
  const rd = fs.createReadStream("file.txt");
  rd.setEncoding("utf-8");

  rd.on("data", console.log);
  rd.on("end", () => console.log("end reading InflowModeExample..."));
  rd.on("error", (e) => console.error(e.stack));
}

PausableModeExamples();
function PausableModeExamples() {
  console.log("PausableModeExamples");
  const rd = fs.createReadStream("file.txt");
  rd.setEncoding("utf-8");

  let chunk;
  let data = "";
  rd.on("readable", () => {
    while ((chunk = rd.read()) != null) {
      data += chunk;
    }
  });
  //   rd.on("data", console.log);
  rd.on("end", () => {
    console.log("PausableModeExamples stream reading completed");
    console.log(data);
  });
  rd.on("error", (e) => console.error(e.stack));
}

/* Writeable streams examples */
writeableStreamExamples();
function writeableStreamExamples() {
  const readableStream = fs.createReadStream("file.txt");
  const writeableStream = fs.createWriteStream("file1.txt");

  readableStream.setEncoding("utf8");
  readableStream.on("data", (chunk) => {
    writeableStream.write(chunk);
  });

  readableStream.on("end", () => {
    writeableStream.write("completed reading the file.");
    writeableStream.write(new Date().toString());
    writeableStream.end("end");
  });
}

class SimpleWriteableStream extends Stream.Writable {
  _write(chunk, encoding, next) {
    console.log(chunk.toString());
    next();
  }
}

writeableStreamExample1();
function writeableStreamExample1() {
  const rd = new Stream.Readable();
  const wd = new SimpleWriteableStream();
  rd.pipe(wd);
  rd.push("\nhello");
  rd.push("\nworld");
  rd.push("\nI am writing this in the writeable stream.");
  rd.push(null);

  console.log("end write stream");
}

writeableStreamExample2();
function writeableStreamExample2() {
  const rd = new Stream.Readable();
  const wd = new SimpleWriteableStream();
  Stream.pipeline(rd, process.stdout, wd, (err) => {
    if (err) console.log("pipeline failed");
    else console.log("finished");
  });
  rd.push("writeableStreamExample2");

  rd.push("\nI am writing this in the writeable stream.");
  rd.push(null);

  console.log("end write stream");
}

class ThrottleStreamExample extends Stream.Writable {
  _write(chunk, encoding, next) {
    console.log(chunk.toString());

    next();
  }
}

const throttleStream = new ThrottleStreamExample();

throttleStream.write("khurram");
throttleStream.write("shahzad");
throttleStream.write("mughal");
throttleStream.cork();

