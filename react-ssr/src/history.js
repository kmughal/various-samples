import {createBrowserHistory,createMemoryHistory} from 'history'

const getHistory = isServer => isServer ? createMemoryHistory() : createBrowserHistory()

export default getHistory