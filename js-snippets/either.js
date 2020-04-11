
class Either {
    constructor(data) {
        if (Array.isArray(data)) {
            this.data = data.length ? data : null
        } else {
            this.data = data ? data : null
        }

        this.hasValue = !!this.data
    }

    map({ success, fail }) {
        if (this.hasValue) {
            if (Array.isArray(this.data)) {
                const newResult = this.data.map(success)
                return new Either(newResult)
            }
            else {
                const newSingleItemResult = success(this.data)
                return new Either(newSingleItemResult)
            }
        }
        else {
            const newFailResult = fail(this.data)
            return new Either(newFailResult)
        }
    }

    match({ action, success, fail }) {

        if (this.hasValue) {
            if (Array.isArray(this.data)) {
                const newResult = this.data.filter(action)
                return new Either(newResult).map({ success, fail })
            }
            else {
                const newSingleValueResult = this.data.filter(action)
                return new Either(newSingleValueResult).map({ success, fail })
            }
        }
        else {
            const newFailResult = action(this.data)
            return new Either(newFailResult).map({ success, fail })
        }
    }
}

class TryCatch {
    constructor()
}

let some = new Either([4, 2, 43, 5, 7])

let output = some.match({
    action: v => {
        throw new Error()
    },
    success: v => `value has been increased ${v}`,
    fail: _ => "no value found"
})

console.log(output)