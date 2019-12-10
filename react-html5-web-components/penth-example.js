

const stream = require("stream");

function *gen() {
    yield 'hello';
    yield 'bye';
}
const readAsString= stream.Readable.from(gen(),{encoding: "utf8"})

async function readableToString(readable) {
    let result = "";
    for await(const chunk of readable) {
        result += chunk;
    }
    return result;
}
assert(await readableToString(readAsString),"\n line\n another line")