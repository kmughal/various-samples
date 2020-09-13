# Introduction

A simple example of stream.

## Diagnostic Node Js

### Using Environmental variables

| Command                                                               | Description                                                                                        |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| NODE_DEBUG=fs node json-stream.js                                     | You can use NODE_DEBUG to get some more information out                                            |
| node --trace-warnings json-stream.js                                  | You can see warnings                                                                               |
| node --redirect-warnings=file.text json-stream.js                     | Warnings saved in a file                                                                           |
| node --trace-deprecation json-stream.js                               | deprecated warnings                                                                                |
| node --trace-sync-io json-stream.js                                   | I/O block routines / code                                                                          |
| node --unhandled-rejections=strict/warn/none json-stream.js           | unrejected promises warnings                                                                       |
| node --prof json-stream.js                                            | This will generate the prof file (Step 1)                                                          |
| node --prof-process isolate-0x10428a000-2661-v8.log > proc.txt        | Step 2 of profile this will create human readable stats.                                           |
| node --inspect-brk json-stream.js                                     | Debug node application in Chrome dev tools. chrome://inspect                                       |
| node --cpu-prof json-stream.js                                        | Starts CPU profiling,can be used to save file in a folder,--cpu-prof-name can be used to name file |
| node --cpu-prof --cpu-prof-dir Prof-Folder json-stream.js             | Starts CPU profiling,can be used to save file in a folder,can be used to name file                 |
| node --cpu-prof --cpu-prof-name cpu-prof.txt json-stream.js           | Specify the name of profile file.                                                                  |
| node --trace-event-categories v8,node,node.async_hooks json-stream.js | By default node,node.async_hooks and v8 categories are enabled,chrome://tracing/ and Record        |
| npx c8 node json-stream.js                                            | This will tell you about code coverage ,NODE_V8_COVERAGE variable                                  |
| process.report.getReport                                              | Can generate reports , data about system also libuv details                                        |

For more read through for Postmortem debugging click [here](https://www.javascriptjanuary.com/blog/nodejs-postmortem-debugging-for-fun-and-production)

## Shebang

If you want to run the nodejs script as command then you will have to add

```js
#!/usr/bin/node

```

This is telling the OS that the run time is node js. But this path can be different. In order to address that issue we can use env!

| Command                                      | Description                                                |
| -------------------------------------------- | ---------------------------------------------------------- |
| #!/usr/bin/env node                          | This is allowing the env to run node                       |
| #!/usr/bin/env -S node --experimental-module | with -S you can pass parameters to nodejs                  |
| #!/usr/bin/env -S node -r ./my/other/file.js | you can also run another command before running the script |
| #!/usr/bin/env -S node --inspect             | open up the inspect port                                   |
| #!/usr/bin/env -S NODE_ENV=production node   | set environment variable                                   |
| #!/usr/bin/env -S -i node                    | start with empty environment                               |
| #!/usr/bin/env -S npx node@6                 | sometimes you want to run a specific version of node       |
| #!/usr/bin/env ts-node                       | run typescript node                                        |
