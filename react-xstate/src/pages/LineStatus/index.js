import React from "react"

import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"


const getLines = async () => {
    const response = await fetch("https://api.tfl.gov.uk/line/mode/tube,dlr,overground/status")
    const json = await response.json()
    console.log(json)
    return json
}

const lineStatusMachine = Machine({
    id: "linefetcher",
    initial: "init",
    context: {
        error: null,
        lines: []
    },
    states: {
        init: {
            on: { FETCH: "loading" }
        },
        loading: {

            invoke: {
                src: getLines,

                onDone: {
                    actions: assign({ lines: (_, event) => event.data }),
                    target: "success"
                },
                onError: {
                    actions: assign({ error: (_, event) => event.data }),
                    target: "unsuccess"
                }
            }
        },
        success: {
            on : { FETCH : "loading" }
        },
        unsuccess: {

        }
    }
})

const toggleMachine = Machine({
    id: 'toggle',
    initial: 'inactive',
    states: {
        inactive: {
            on: { TOGGLE: 'active' }
        },
        active: {
            on: { TOGGLE: 'inactive' }
        }
    }
});

const Lines = ({ lines }) => {
    const markup = lines.map(line => ({ name: line.name, message: line.lineStatuses[0].statusSeverityDescription }))
        .map((l, i) => <div key={i}>{l.name} has {l.message}</div>)

    return <section>{markup}</section>
}


export default function () {
    const [state, send] = useMachine(lineStatusMachine)
    return <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={e => send("FETCH")}>Start toggle</button>
        <div>Line Status</div>
        {state.matches("loading") && (<p>Loading lines status please wait</p>)}
        {state.matches("success") && (<Lines lines={state.context.lines} />)}
    </>
}