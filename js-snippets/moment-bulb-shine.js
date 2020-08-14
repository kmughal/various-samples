Array.prototype.remove = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) {
      this.splice(i, 1)
      i--
    }
  }
  return this
}

function findMoments(bulbs) {
  const store = []
  const missing = []
  let result = 0
  for (let i = 0; i < bulbs.length; i++) {
    if (!store.some((s) => i + 1 === s) && i + 1 != bulbs[i])
      missing.push(i + 1)

    if (i + 1 < bulbs[i]) store.push(bulbs[i])
    else missing.remove(bulbs[i])

    if (missing.length == 0) result++
  }

  console.log("result :", result, store, missing)
}

findMoments([2, 1, 3, 5, 4])
