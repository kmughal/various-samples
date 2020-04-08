import React from "react"
import { render } from "react-dom"

import { useMachine } from '@xstate/react';
import { Machine, State } from 'xstate';
import { interpret, Interpreter } from "xstate/lib/interpreter"


const wizardMachine = Machine({
    id: "wizard",
    initial: "init",
    context: {
        basicInformationValues: null,
        someQuestionsValues: null,
        review: null
    },
    states: {
        init: {
            on: {
                next: "basicInfo",
                GOBACK: "init"
            }
        },
        basicInfo: {
            on: {
                next: "someQuestion",
                GOBACK: "init"
            }
        },
        someQuestion: {
            on: {
                next: "review",
                GOBACK: "basicInfo"
            }
        },
        review: {
            on: {
                next: "complete",
                GOBACK: "someQuestion"
            }
        },
        complete: {
            on: { next: "start_again" }
        },
        start_again: {
            on: { next: "init" }
        }

    }

})


export const App = () => {

    const [state, send] = useMachine(wizardMachine, {
        state: localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : {}
    });
    const goPrev = _ => send("GOBACK")
    document.title = "Wizard :" + state.value;
    return <>
        {state.matches("init") && (<InitPage goPrev={goPrev} />)}
        {state.matches("basicInfo") && (<BasicInformation goPrev={goPrev} />)}
        {state.matches("someQuestion") && (<SomeOtherQuestions goPrev={goPrev} />)}
        {state.matches("review") && (<Review prev={state.history} goPrev={goPrev} />)}
        {state.matches("complete") && (<p>Thank you</p>)}
        {state.matches("start_again") && (<p>You are about to start this again!</p>)}
        <br/>
        <hr/>
        <button onClick={e => {
            send("GOBACK")
        }}> Previous Page : [{state.history.value}] </button>
        <div style={{display: "inline-block", position: "relative", left : "30%"}}>Current Page : {state.value}</div>
        <button style={{float:"right"}} onClick={e => send("next")}> Go Next </button>
    </>
}

const InitPage = ({ goPrev }) => {
    return <>
        <h1>Introduction page for wizard!</h1>
        <hr/>
        You are about to start the page
       
    </>
}

const BasicInformation = ({ goPrev }) => {
    return <>
        <h1>Basic Information</h1>
        <form>

            <p>Enter your name:</p>
            <input
                type='text'
            />
        </form>
    </>
}


const SomeOtherQuestions = ({ goPrev }) => {
    return <>
        <h1>Some Other Questions</h1>
    </>
}

const Review = ({ goPrev }) => {
    return <>
        <h1>Review</h1>

    </>
}

render(<App />, document.getElementById("app"));