# Introduction

A simple example of stream.

## Diagnostic Node Js

### Using Environmental variables

| Command                                                        | Description                                              |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| NODE_DEBUG=fs node json-stream.js                              | You can use NODE_DEBUG to get some more information out  |
| node --trace-warnings json-stream.js                           | You can see warnings                                     |
| node --redirect-warnings=file.text json-stream.js              | Warnings saved in a file                                 |
| node --trace-deprecation json-stream.js                        | deprecated warnings                                      |
| node --trace-sync-io json-stream.js                            | I/O block routines / code                                |
| node --unhandled-rejections=strict/warn/none json-stream.js    | unrejected promises warnings                             |
| node --prof json-stream.js                                     | This will generate the prof file (Step 1)                |
| node --prof-process isolate-0x10428a000-2661-v8.log > proc.txt | Step 2 of profile this will create human readable stats. |
