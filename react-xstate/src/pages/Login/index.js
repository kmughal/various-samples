import React from "react"
import Header from "../../components/Header"
import fetch from "node-fetch"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"


import { useMachine } from "@xstate/react"
import { Machine } from "xstate"


const fetchMachine = Machine({
    id: "fetch",
    initial: "idle",
    states: {
        idle: {
            on: { FETCH: "notidle" }
        },
        notidle: {
            on: { FETCH: "loading" }
        },
        loading: {
            on: { FETCH: "loaded" }
        },
        loaded: {
            on: { FETCH: "idle" }
        }

    }
})


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

export default function Login() {
    const username = React.useRef(null)
    const password = React.useRef(null)
    const onFetch = (username, password) => fetch(`/api/auth?username=${username}&password=${password}`)

    const [state, send] = useMachine(ApiClientMachine, {
        actions: {
            load: () => {
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

    return (<>
        <Header />
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



// In order to kill a server 
//sudo lsof -i :3000
// kill -9 {pid}