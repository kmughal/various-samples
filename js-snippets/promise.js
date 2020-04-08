const a = new Promise((_, rej) => rej(new Error("error occured")))
const b = new Promise((res, _) => res("good method"))
const filteredPromises = [b, a].map(p => p.catch(e => e))
Promise.all(filteredPromises)
    .then(v => {
        console.log("v:", v)
    }).catch(e => {
        console.log("e:", e)
        return e
    })