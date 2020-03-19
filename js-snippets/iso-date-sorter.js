Array.prototype.print = function (message) {
  console.log(message, '\n')
  console.log(this)
}

const dates = []
dates.push(
  new Date(2020, 3, 2).toISOString(),
  new Date(2019, 2, 21).toISOString(),
  new Date(2002, 3, 25).toISOString(),
  new Date(1997, 11, 21).toISOString(),
  new Date(1998, 0, 2).toISOString(),
  new Date(1980, 3, 2).toISOString()
)
dates.print('Before sorting :')
dates.sort(sorter).print('After sorting :')
function sorter (a, b) {
  var r = 0,
    i = 0
  while (i++ < b.length) if ((r = a.charCodeAt(i) - b.charCodeAt(i))) return r
  return r
}
