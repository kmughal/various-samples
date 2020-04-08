import React from "react"
import Header from "../../components/Header"
import fetch from "node-fetch"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"


import { useMachine } from "@xstate/react"
import { Machine, assign } from "xstate"

const fetchMachine = Machine({
    id: 'fetch',
    initial: 'idle',
    context: {
        data: undefined,
        error: undefined
    },
    states: {
        idle: {
            on: { FETCH: 'loading' }
        },
        loading: {
            invoke: {
                src: 'fetchData',
                onDone: {
                    target: 'success',
                    actions: assign({
                        data: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        success: {
            entry: 'notifySuccess',
            type: 'final'
        },
        failure: {
            on: {
                RETRY: 'loading'
            }
        }
    }
});

const Fetcher = ({ onResolve, username, password }) => {
    const [state, send] = useMachine(fetchMachine, {
        actions: {
            notifySuccess: ctx => onResolve(ctx.data)
        },
        services: {
            fetchData: (_, e) => fetch(`/api/auth?username=${e.username}&password=${e.password}`)
                .then(response => {
                    if (response.status >= 400) return new Promise((_, reject) => reject(response))
                    else return new Promise((resolve, _) => resolve(resolve))
                })
        }
    });

    switch (state.value) {
        case 'idle':
            return (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => send('FETCH', { username: username.current.value, password: password.current.value })}>
                    Sign in
                </button>
            );
        case 'loading':
            return <div>Searching...</div>;
        case 'success':
            return (<>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => send('FETCH', { username: username.current.value, password: password.current.value })}>
                    Sign in
                </button>

            </>)
        case 'failure':
            return (
                <>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => send('FETCH', { username: username.current.value, password: password.current.value })}>
                        Sign in
                    </button>

                </>
            );
        default:
            return null;
    }
};


const ApiClientMachine = Machine({
    id: "http-client",
    initial: "idle",
    states: {
        idle: {
            on: { FETCH: "sending" }
        },
        sending: {
            entry: ["load"],
            on: {
                RESOLVE: {
                    target: 'success',
                    actions: Object.assign({
                        data: (context, event) => event.data
                    })
                },
                FAIL: {
                    target: "unsuccess",
                    actions: Object.assign({ data: (context, event) => event.data })
                }
            }
        },
        success: {
            on: { FETCH: "sending" }
        },
        unsuccess: {
            on: { FETCH: "sending" }
        }
    }
})

export function Login1() {
    const username = React.useRef(null)
    const password = React.useRef(null)
    const onFetch = (username, password) => fetch(`/api/auth?username=${username}&password=${password}`)

    const [state, send] = useMachine(ApiClientMachine, {
        actions: {
            load: () => {

                if (username.current.value === "" || password.current.value === "") {
                    return setError({ message: "username / password is empty" })
                }

                onFetch(username.current.value, password.current.value)
                    .then(response => {
                        return new Promise((resolve, reject) => {
                            response.json()
                                .then(result => {
                                    if (response.status >= 400)
                                        reject(result)
                                    else
                                        resolve(result)
                                })
                        })
                    })
                    .catch(setError)
                    .then(setSuccess)

                function setError(e) {
                    send({ type: "FAIL", data: e })
                }

                function setSuccess(s) {
                    send({ type: "RESOLVE", data: s })
                }

            }
        }
    })

    const submitForm = event => {
        event.preventDefault()
        send("FETCH")
    }
    console.log("state:", state)
    return (<>

        <div className="container mx-auto">
            <div className="w-full max-w-xs">
                {state.value === "success" && SuccessMessage(state.event.data.message)}
                {state.value === "unsuccess" && ErrorMessage(state.event.data.message)}
                <form onSubmit={submitForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Username" ref={username} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="******************" ref={password} />
                    </div>

                    <div className="flex items-center justify-between">
                        <Fetcher onResolve={e => console.log(e)} username={username} password={password} />

                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a></div>
                </form>
                <p className="text-center text-gray-500 text-xs">©2020 Fake Corp. All rights reserved.</p>
            </div>
        </div>
    </>)
}


export function Login2() {
    const username = React.useRef(null)
    const password = React.useRef(null)
    const onFetch = (username, password) => fetch(`/api/auth?username=${username}&password=${password}`)

    const [state, send] = useMachine(ApiClientMachine, {
        actions: {
            load: () => {

                if (username.current.value === "" || password.current.value === "") {
                    return setError({ message: "username / password is empty" })
                }

                onFetch(username.current.value, password.current.value)
                    .then(response => {
                        return new Promise((resolve, reject) => {
                            response.json()
                                .then(result => {
                                    if (response.status >= 400)
                                        reject(result)
                                    else
                                        resolve(result)
                                })
                        })
                    })
                    .catch(setError)
                    .then(setSuccess)

                function setError(e) {
                    send({ type: "FAIL", data: e })
                }

                function setSuccess(s) {
                    send({ type: "RESOLVE", data: s })
                }

            }
        }
    })

    const submitForm = event => {
        event.preventDefault()
        send("FETCH")
    }
    console.log(state, "state")
    return (<>
        <div className="container mx-auto">
            <div className="w-full max-w-xs">
                {state.value === "success" && SuccessMessage(state.event.data.message)}
                {state.value === "unsuccess" && ErrorMessage(state.event.data.message)}
                <form onSubmit={submitForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Username" ref={username} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="******************" ref={password} />
                    </div>

                    <div className="flex items-center justify-between">
                        <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a></div>
                </form>
                <p className="text-center text-gray-500 text-xs">©2020 Fake Corp. All rights reserved.</p>
            </div>
        </div>
    </>)
}



export default function () {
    return (<>
        <Header />
        <Login1 /> <br /> <Login2 />
    </>)
}

// In order to kill a server 
//sudo lsof -i :3000
// kill -9 {pid}