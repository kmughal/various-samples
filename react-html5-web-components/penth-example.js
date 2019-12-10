const stream = require("stream");

function* gen() {
  yield "hello";
  yield "bye";
}
const readAsString = stream.Readable.from(gen(), { encoding: "utf8" });

async function readableToString(readable) {
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}
// assert(await readableToString(readAsString), "\n line\n another line");

const penthouse = require("penthouse");
const fs = require("fs");

penthouse({
  url: "https://google.com",
  cssString: "body { color: red }"
}).then(criticalCss => {
  // use the critical css
  fs.writeFileSync("outfile.css", criticalCss);
});
